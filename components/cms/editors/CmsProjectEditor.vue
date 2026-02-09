<template>
  <div class="flex flex-col gap-8">
    <!-- Main Content Identity Section -->
    <section
      class="flex flex-col gap-10 bg-component/30 p-8 rounded-2xl border border-border/40 shadow-sm relative overflow-hidden group/identity">
      <div class="flex flex-col lg:flex-row gap-10">
        <!-- Core Details Grid -->
        <div class="flex-1 flex flex-col gap-8">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
                Project Identity
              </h3>
              <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                Base definition and identifiers
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2.5 md:col-span-2">
              <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Entry
                Title</label>
              <input :value="modelValue.title" type="text" placeholder="The Next Great Innovation"
                class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg"
                @input="
                  $emit('update:modelValue', {
                    ...modelValue,
                    title: ($event.target as HTMLInputElement).value,
                  })
                  ">
            </div>
            <div class="flex flex-col gap-2.5">
              <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Slug (URL)</label>
              <input :value="modelValue.slug" type="text" placeholder="project-name"
                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-mono text-sm"
                @input="
                  $emit('update:modelValue', {
                    ...modelValue,
                    slug: ($event.target as HTMLInputElement).value,
                  })
                  ">
            </div>
            <div class="flex flex-col gap-2.5">
              <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Project
                Year</label>
              <input :value="modelValue.year" type="number" placeholder="2024"
                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                @input="
                  $emit('update:modelValue', {
                    ...modelValue,
                    year: ($event.target as HTMLInputElement).value,
                  })
                  ">
            </div>
            <div class="flex flex-col gap-2.5">
              <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Role</label>
              <input :value="modelValue.role" type="text" placeholder="Lead Product Designer"
                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-medium"
                @input="
                  $emit('update:modelValue', {
                    ...modelValue,
                    role: ($event.target as HTMLInputElement).value,
                  })
                  ">
            </div>
          </div>
        </div>

        <!-- Cover Image Sidecar -->
        <div class="w-full lg:w-72 flex flex-col gap-4">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Cover Asset</label>
          <div
            class="relative aspect-square rounded-2xl border border-border/40 bg-muted/20 overflow-hidden group/cover cursor-pointer hover:border-blue-500/50 transition-all"
            @click="$emit('open-unsplash', 'coverImage')">
            <img v-if="modelValue.coverImage" :src="modelValue.coverImage"
              class="w-full h-full object-cover transition-transform group-hover/cover:scale-105">
            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 opacity-40">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 fill-foreground/50">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M15 4.5H9V8.5H15V4.5Z"></path>
                  <path d="M4 10.5H9V14.5H15V10.5H20V19.5H4V10.5Z"></path>
                </g>
              </svg>
              <span class="text-xxs font-bold uppercase tracking-widest">Select Image</span>
            </div>
            <div
              class="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center">
              <Pencil class="text-white" :size="20" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input :value="modelValue.coverImage" type="text" placeholder="Image URL..."
              class="flex-1 bg-background border border-border/60 rounded-lg px-4 py-2 text-xxs font-mono focus:outline-none focus:border-blue-500"
              @input="
                $emit('update:modelValue', {
                  ...modelValue,
                  coverImage: ($event.target as HTMLInputElement).value,
                })
                ">
            <label
              class="cursor-pointer p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Upload Local Image">
              <input type="file" class="hidden" @change="$emit('upload-image', $event, 'coverImage')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </label>
          </div>
          <div class="flex flex-col gap-2">
            <input :value="modelValue.coverImageAlt" type="text" placeholder="Alt Text (SEO)..."
              class="bg-background border border-border/60 rounded-lg px-4 py-2 text-xxs font-mono focus:outline-none focus:border-blue-500 transition-all font-medium"
              @input="
                $emit('update:modelValue', {
                  ...modelValue,
                  coverImageAlt: ($event.target as HTMLInputElement).value,
                })
                ">
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Technical Specs (Premium Compact Grid) -->
    <section class="p-8 bg-component/20 border border-border/40 rounded-2xl relative overflow-hidden group/specs">
      <div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
      <div class="flex items-center gap-4 mb-8">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </svg>
        </div>
        <div>
          <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
            Engineering Blueprint
          </h3>
          <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
            Stack, performance, and accessibility
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="flex flex-col gap-1.5 lg:col-span-2">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Technical
            Stack</label>
          <div
            class="flex flex-wrap items-center gap-2 bg-background/50 border border-border/60 rounded-lg p-2 focus-within:border-blue-500 transition-all">
            <span v-for="(stack, i) in modelValue.techStack" :key="i"
              class="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-md border border-emerald-500/20 group/tag">
              {{ stack }}
              <button type="button" class="opacity-40 hover:opacity-100 transition-opacity"
                @click="removeListItem('techStack', Number(i))">
                <X :size="12" stroke-width="3" />
              </button>
            </span>
            <input v-model="pendingTechStack" type="text" placeholder="Vue, Nuxt..."
              class="flex-1 min-w-[120px] bg-transparent border-none outline-none focus:ring-0 text-sm p-1"
              @keydown.enter.prevent="addListItem('techStack', 'pendingTechStack')"
              @keydown.,.prevent="addListItem('techStack', 'pendingTechStack')"
              @blur="addListItem('techStack', 'pendingTechStack')">
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Repo URL</label>
          <input :value="modelValue.repositoryUrl" type="text" placeholder="GitHub link..."
            class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-xs font-mono"
            @input="
              $emit('update:modelValue', {
                ...modelValue,
                repositoryUrl: ($event.target as HTMLInputElement).value,
              })
              ">
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Live Demo</label>
          <input :value="modelValue.liveDemoUrl" type="text" placeholder="Live site..."
            class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-xs font-mono"
            @input="
              $emit('update:modelValue', {
                ...modelValue,
                liveDemoUrl: ($event.target as HTMLInputElement).value,
              })
              ">
        </div>
        <div class="flex flex-col gap-1.5 lg:col-span-2">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Performance
            Metrics</label>
          <input :value="modelValue.performanceMetrics" type="text" placeholder="Lighthouse scores, render times..."
            class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm"
            @input="
              $emit('update:modelValue', {
                ...modelValue,
                performanceMetrics: ($event.target as HTMLInputElement).value,
              })
              ">
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Industry</label>
          <input :value="modelValue.industry" type="text" placeholder="Fintech, SaaS..."
            class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
            @input="
              $emit('update:modelValue', {
                ...modelValue,
                industry: ($event.target as HTMLInputElement).value,
              })
              ">
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Duration</label>
          <input :value="modelValue.duration" type="text" placeholder="3 Months"
            class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
            @input="
              $emit('update:modelValue', {
                ...modelValue,
                duration: ($event.target as HTMLInputElement).value,
              })
              ">
        </div>
      </div>
    </section>

    <!-- Legacy: Project Links & Assets -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">
            {{
              modelValue.isFigma ? "Figma File / Embed Link" : "Project Link"
            }}
          </label>
          <input :value="modelValue.projectLink" type="text" :placeholder="modelValue.isFigma
            ? 'https://www.figma.com/file/...'
            : 'https://...'
            "
            class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-mono text-xs"
            @input="
              $emit('update:modelValue', {
                ...modelValue,
                projectLink: ($event.target as HTMLInputElement).value,
              })
              ">
          <p class="text-xxs text-muted-foreground px-1">
            {{ projectLinkHelpText }}
          </p>
        </div>
        <div class="flex items-center gap-4 p-4 border border-border/60 rounded-xl bg-background/50">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input :checked="modelValue.isFigma" type="checkbox" class="sr-only peer" @change="
              $emit('update:modelValue', {
                ...modelValue,
                isFigma: ($event.target as HTMLInputElement).checked,
              })
              ">
            <div class="w-10 h-6 bg-border rounded-full relative transition-colors peer-checked:bg-purple-600">
              <div
                class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </div>
            <span
              class="text-xxs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Embed
              Figma Prototype</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Legacy: Product Strategy & Context -->
    <section class="flex flex-col gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <div>
          <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
            Product Strategy
          </h3>
          <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
            Problem, Goals & Users
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2.5 md:col-span-2">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Problem
            Statement</label>
          <TiptapEditor :model-value="modelValue.problemStatement" placeholder="What user pain point are we solving?"
            @update:model-value="
              (val) =>
                $emit('update:modelValue', {
                  ...modelValue,
                  problemStatement: val,
                })
            " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Business Goal</label>
          <TiptapEditor :model-value="modelValue.businessGoal" placeholder="Revenue, Acquisition, Retention..."
            @update:model-value="
              (val) =>
                $emit('update:modelValue', { ...modelValue, businessGoal: val })
            " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">User Goal</label>
          <TiptapEditor :model-value="modelValue.userGoal" placeholder="What is the user trying to achieve?"
            @update:model-value="
              (val) =>
                $emit('update:modelValue', { ...modelValue, userGoal: val })
            " />
        </div>
        <div class="flex flex-col gap-2.5 md:col-span-2">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Target Users</label>
          <TiptapEditor :model-value="modelValue.targetUsers" placeholder="Primary personas..." @update:model-value="
            (val) =>
              $emit('update:modelValue', { ...modelValue, targetUsers: val })
          " />
        </div>
      </div>
    </section>

    <!-- Legacy: Design Process & Visuals -->
    <section class="flex flex-col gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m14.31 8-5.74 9.94" />
            <path d="M9.69 8h11.48" />
          </svg>
        </div>
        <div>
          <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
            Design Process
          </h3>
          <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
            Methods, Tools & Artifacts
          </p>
        </div>
        <GeminiButton @click="
          $emit('open-ai', {
            field: 'content.sections',
            suggestion: 'Outline the design process steps for this project',
            mode: 'sections',
          })
          " />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Design
            Approach</label>
          <TiptapEditor :model-value="modelValue.designApproach" placeholder="Methodology used..." @update:model-value="
            (val) =>
              $emit('update:modelValue', {
                ...modelValue,
                designApproach: val,
              })
          " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Research
            Methods</label>
          <TiptapEditor :model-value="modelValue.researchMethods" placeholder="Interviews, Surveys, Testing..."
            @update:model-value="
              (val) =>
                $emit('update:modelValue', {
                  ...modelValue,
                  researchMethods: val,
                })
            " />
        </div>
        <div class="flex flex-col gap-2.5 md:col-span-2">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Key Insights</label>
          <TiptapEditor :model-value="modelValue.keyInsights" placeholder="What did we learn?" @update:model-value="
            (val) =>
              $emit('update:modelValue', { ...modelValue, keyInsights: val })
          " />
        </div>
        <div class="flex flex-col gap-2.5 md:col-span-2">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Design Tools</label>
          <div
            class="flex flex-wrap items-center gap-2 bg-background/50 border border-border/60 rounded-lg p-2 focus-within:border-blue-500 transition-all">
            <span v-for="(tool, i) in modelValue.tools" :key="i"
              class="flex items-center gap-1.5 px-2.5 py-1 bg-pink-500/10 text-pink-500 text-xs font-bold rounded-md border border-pink-500/20 group/tag">
              {{ tool }}
              <button type="button" class="opacity-40 hover:opacity-100 transition-opacity"
                @click="removeListItem('tools', Number(i))">
                <X :size="12" stroke-width="3" />
              </button>
            </span>
            <input v-model="pendingTools" type="text" placeholder="Figma, Principle..."
              class="flex-1 min-w-[120px] bg-transparent border-none outline-none focus:ring-0 text-sm p-1"
              @keydown.enter.prevent="addListItem('tools', 'pendingTools')"
              @keydown.,.prevent="addListItem('tools', 'pendingTools')" @blur="addListItem('tools', 'pendingTools')">
          </div>
        </div>
      </div>

      <!-- Wireframes Upload -->
      <div class="flex flex-col gap-4 pt-6 border-t border-border/20">
        <div class="flex justify-between items-center">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Wireframes &
            Sketches</label>
          <label
            class="cursor-pointer bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-colors flex items-center gap-2">
            <span>Upload</span>
            <input type="file" multiple class="hidden" @change="$emit('upload-image', $event, 'wireframes')">
          </label>
        </div>
        <div v-if="modelValue.wireframes?.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(img, i) in modelValue.wireframes" :key="i"
            class="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border/40">
            <img :src="img" class="w-full h-full object-cover">
            <button type="button"
              class="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all"
              @click="
                () => {
                  const newArr = [...modelValue.wireframes];
                  newArr.splice(Number(i), 1);
                  $emit('update:modelValue', {
                    ...modelValue,
                    wireframes: newArr,
                  });
                }
              ">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Final Designs Upload -->
      <div class="flex flex-col gap-4 pt-4 border-t border-border/20">
        <div class="flex justify-between items-center">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Final Design
            Gallery</label>
          <label
            class="cursor-pointer bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-colors flex items-center gap-2">
            <span>Upload</span>
            <input type="file" multiple class="hidden" @change="$emit('upload-image', $event, 'finalDesigns')">
          </label>
        </div>
        <div v-if="modelValue.finalDesigns?.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(img, i) in modelValue.finalDesigns" :key="i"
            class="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border/40">
            <img :src="img" class="w-full h-full object-cover">
            <button type="button"
              class="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all"
              @click="
                () => {
                  const newArr = [...modelValue.finalDesigns];
                  newArr.splice(Number(i), 1);
                  $emit('update:modelValue', {
                    ...modelValue,
                    finalDesigns: newArr,
                  });
                }
              ">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Technical Narrative -->
    <section class="flex flex-col gap-10 bg-component/30 p-8 rounded-2xl border border-border/40">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M8 7h6" />
              <path d="M8 11h8" />
            </svg>
          </div>
          <div>
            <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
              Case Study Detail
            </h3>
            <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
              Storytelling and implementation deep-dive
            </p>
          </div>
        </div>
        <GeminiButton @click="
          $emit('open-ai', {
            field: 'content.introduction',
            suggestion: 'Write a technical introduction for this project',
          })
          " />
      </div>

      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">The Technical
            Challenge</label>
          <TiptapEditor :model-value="modelValue.challenge" placeholder="Constraint, problem, or technical hurdle..."
            @update:model-value="
              (val) =>
                $emit('update:modelValue', { ...modelValue, challenge: val })
            " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Architectural
            Decisions</label>
          <TiptapEditor :model-value="modelValue.architecture" placeholder="Scalability, patterns, choice of tools..."
            @update:model-value="
              (val) =>
                $emit('update:modelValue', { ...modelValue, architecture: val })
            " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Implementation
            Highlights</label>
          <TiptapEditor :model-value="modelValue.implementationHighlights"
            placeholder="Key breakthroughs and optimizations..." @update:model-value="
              (val) =>
                $emit('update:modelValue', {
                  ...modelValue,
                  implementationHighlights: val,
                })
            " />
        </div>
      </div>
    </section>

    <!-- Legacy: Results & Impact -->
    <section class="flex flex-col gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
        <div>
          <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
            Project Outcomes
          </h3>
          <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
            Results & Reflection
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Solution
            Summary</label>
          <TiptapEditor :model-value="modelValue.solutionSummary" placeholder="What was the final solution?"
            @update:model-value="
              (val) =>
                $emit('update:modelValue', {
                  ...modelValue,
                  solutionSummary: val,
                })
            " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Key Outcomes</label>
          <TiptapEditor :model-value="modelValue.outcome" placeholder="Impact, metrics, results..." @update:model-value="
            (val) =>
              $emit('update:modelValue', { ...modelValue, outcome: val })
          " />
        </div>
        <div class="flex flex-col gap-2.5">
          <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Learnings</label>
          <TiptapEditor :model-value="modelValue.learnings" placeholder="What would you do differently?"
            @update:model-value="
              (val) =>
                $emit('update:modelValue', { ...modelValue, learnings: val })
            " />
        </div>
      </div>
    </section>

    <!-- Section 4: Metadata & Visibility -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-component/10 border border-border/20 rounded-2xl">
      <div class="flex flex-col gap-3">
        <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Tags
          (Visibility)</label>
        <div
          class="flex flex-wrap items-center gap-2 bg-background/50 border border-border/40 rounded-lg p-2 focus-within:border-blue-500 transition-all">
          <span v-for="(tag, i) in modelValue.tags" :key="i"
            class="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-md border border-blue-500/20 group/tag">
            {{ tag }}
            <button type="button" class="opacity-40 hover:opacity-100 transition-opacity"
              @click="removeListItem('tags', Number(i))">
              <X :size="12" stroke-width="3" />
            </button>
          </span>
          <input v-model="pendingTag" type="text" placeholder="Design, Engineering..."
            class="flex-1 min-w-[120px] bg-transparent border-none outline-none focus:ring-0 text-sm p-1"
            @keydown.enter.prevent="addListItem('tags', 'pendingTag')"
            @keydown.,.prevent="addListItem('tags', 'pendingTag')" @blur="addListItem('tags', 'pendingTag')">
        </div>
      </div>
      <div class="flex items-center gap-10">
        <label class="flex items-center gap-3 cursor-pointer group">
          <input :checked="modelValue.featured" type="checkbox" class="sr-only peer" @change="
            $emit('update:modelValue', {
              ...modelValue,
              featured: ($event.target as HTMLInputElement).checked,
            })
            ">
          <div class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-blue-600">
            <div
              class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
          </div>
          <span
            class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Featured</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer group">
          <input :checked="modelValue.hidden" type="checkbox" class="sr-only peer" @change="
            $emit('update:modelValue', {
              ...modelValue,
              hidden: ($event.target as HTMLInputElement).checked,
            })
            ">
          <div class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-red-500">
            <div
              class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
          </div>
          <span
            class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Archive</span>
        </label>
      </div>
    </section>

    <!-- Sticky Action Bar -->
    <div
      class="sticky bottom-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-t border-border/60 -mx-8 -mb-8 mt-8 rounded-b-2xl">
      <button type="button"
        class="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        @click="$emit('cancel')">
        Cancel
      </button>
      <button type="button" :disabled="isUploading"
        class="px-8 py-2.5 rounded-xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-black/5 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('save')">
        <span v-if="isUploading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {{ isUploading ? "Saving..." : "Save Changes" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ImageIcon, Pencil, X } from "lucide-vue-next";
import GeminiButton from "@/components/cms/GeminiButton.vue";

const props = defineProps<{
  modelValue: any;
  isUploading?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "open-ai", payload: { field: string; suggestion: string; mode?: 'text' | 'sections' }): void;
  (e: "open-unsplash", target: string): void;
  (e: "upload-image", event: Event, field: string): void;
  (e: "save" | "cancel"): void;
}>();

const pendingTag = ref('')
const pendingTechStack = ref('')
const pendingTools = ref('')

const addListItem = (field: string, pendingField: string) => {
  const pendingRef = pendingField === 'pendingTag' ? pendingTag : pendingField === 'pendingTechStack' ? pendingTechStack : pendingTools
  const val = pendingRef.value.trim().replace(/,$/, '')
  if (!val) return

  const currentList = [...(props.modelValue[field] || [])]
  if (!currentList.includes(val)) {
    currentList.push(val)
    emit('update:modelValue', { ...props.modelValue, [field]: currentList })
  }
  pendingRef.value = ''
}

const removeListItem = (field: string, index: number) => {
  const currentList = [...(props.modelValue[field] || [])]
  currentList.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, [field]: currentList })
}


const projectLinkHelpText = computed(() => {
  return props.modelValue.isFigma
    ? "Paste the direct Figma file link or embed code. We will handle the generation."
    : "Enter the public URL for the live project or case study.";
});
</script>
