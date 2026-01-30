
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Manually parse .env
const envPath = path.resolve(process.cwd(), '.env')
let supabaseUrl = ''
let supabaseKey = ''

if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8')
    const urlMatch = content.match(/SUPABASE_URL=(.*)/)
    const keyMatch = content.match(/SUPABASE_KEY=(.*)/) // Try standard key first
    const serviceKeyMatch = content.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/) // Then service key
    
    if (urlMatch) supabaseUrl = urlMatch[1].trim()
    if (serviceKeyMatch) {
         supabaseKey = serviceKeyMatch[1].trim()
    } else if (keyMatch) {
         supabaseKey = keyMatch[1].trim()
    }
}

if (!supabaseUrl || !supabaseKey) {
    console.error('Could not find Supabase credentials in .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkProjects() {
    console.log('Checking Google TV and Konfera...')
    
    // List all projects to see what we have
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .in('id', ['bc9f2080-7730-4e14-91c1-97eb9e0c352a', '3426ae57-5c3c-411e-becb-b3f8e6cde625'])
    
    if (error) {
        console.error('Error fetching projects:', error)
        return
    }

    console.log(`Found ${data.length} projects:`)
    data.forEach(p => {
        console.log(`\n------------------------------------------------`)
        console.log(`Project: ${p.title}`)
        console.log(`problem_statement:`, p.problem_statement)
        console.log(`business_goal:`, p.business_goal)
        console.log(`design_approach:`, p.design_approach)
        console.log(`research_methods:`, p.research_methods)
        console.log(`wireframes:`, p.wireframes?.length)
        console.log(`final_designs:`, p.final_designs?.length)
    })
}

checkProjects()
