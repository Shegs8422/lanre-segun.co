-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read" ON gallery;
CREATE POLICY "Allow public read" ON gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Full access" ON gallery;
CREATE POLICY "Full access" ON gallery FOR ALL USING (true) WITH CHECK (true);
