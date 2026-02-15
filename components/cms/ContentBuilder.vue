<template>
  <div class="flex flex-col gap-4 max-w-3xl mx-auto py-12">
    <!-- New Block Inserter (Start) -->
    <div class="relative group/inserter h-8 -mt-4 mb-4 flex items-center justify-center">
      <div class="absolute inset-x-0 h-px bg-border/50 opacity-0 group-hover/inserter:opacity-100 transition-opacity" />
      <button type="button"
        class="relative w-8 h-8 rounded-full bg-component border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 hover:scale-110 transition-all opacity-0 group-hover/inserter:opacity-100"
        @click="addBlockAt(0)">
        <Plus :size="16" />
      </button>
    </div>

    <!-- Block List -->
    <template v-for="(block, index) in blocks" :key="block.id">
      <div
        class="group relative bg-transparent transition-all border-l-2 border-transparent hover:border-blue-500/20 px-6 py-4">
        <!-- Block Controls (Far Left) -->
        <div
          class="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" :disabled="index === 0"
            class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            @click="moveBlock(index, -1)">
            <ArrowUp :size="14" />
          </button>
          <button type="button" :disabled="index === blocks.length - 1"
            class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            @click="moveBlock(index, 1)">
            <ArrowDown :size="14" />
          </button>
          <button type="button"
            class="p-1.5 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500 transition-colors"
            title="Remove Section" @click="removeBlock(index)">
            <X :size="14" />
          </button>
        </div>

        <!-- Text Block -->
        <div v-if="block.type === 'text'" class="flex flex-col gap-4">
          <input v-model="block.heading" type="text" placeholder="Section Heading (Optional)"
            class="w-full bg-transparent text-2xl font-bold placeholder:text-muted-foreground/30 border-none outline-none focus:ring-0 p-0 text-foreground leading-tight"
            @input="emitUpdate">

          <TiptapEditor v-model="block.body" placeholder="Type your content here..." @update:model-value="emitUpdate" />
        </div>

        <!-- Image Block -->
        <div v-else-if="block.type === 'image'" class="flex flex-col gap-4">
          <div v-if="block.url" class="relative group/image">
            <div class="rounded-xl overflow-hidden border border-border/50 bg-muted/30">
              <img :src="block.url" class="w-full object-cover" alt="Section Image">
            </div>
            <button type="button"
              class="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-md text-foreground rounded-full border border-border shadow-lg opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-blue-500 hover:text-white"
              @click="
                block.url = '';
              emitUpdate();
              ">
              <Pencil :size="14" />
            </button>

            <!-- Caption Input -->
            <input v-model="block.caption" type="text" placeholder="Add a caption..."
              class="w-full text-center text-sm text-muted-foreground mt-4 italic bg-transparent border-none outline-none focus:ring-0 p-0"
              @input="emitUpdate">
          </div>

          <div v-else
            class="border-2 border-dashed border-border/50 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group/upload"
            @click="triggerImageUpload(index)">
            <div
              class="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover/upload:scale-110 transition-transform">
              <ImagePlus :size="32" class="opacity-50" />
            </div>
            <div class="flex flex-col items-center gap-1">
              <span class="text-sm font-bold text-foreground">Click to upload image</span>
              <span class="text-xs">Supports JPG, PNG, WebP. Recommended width 1200px+.</span>
            </div>
            <input :ref="(el) => (fileInputs[index] = el)" type="file" class="hidden" accept="image/*"
              @change="(e) => handleImageUpload(e, index)">
          </div>
        </div>

        <!-- Video Block -->
        <div v-else-if="block.type === 'video'" class="flex flex-col gap-4">
          <div v-if="block.url && extractYoutubeId(block.url)" class="relative group/video">
            <div
              class="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 bg-black shadow-lg">
              <iframe class="absolute inset-0 w-full h-full"
                :src="`https://www.youtube.com/embed/${extractYoutubeId(block.url)}`" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </div>

            <!-- Edit Button -->
            <button type="button"
              class="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-md text-foreground rounded-full border border-border shadow-lg opacity-0 group-hover/video:opacity-100 transition-opacity hover:bg-blue-500 hover:text-white z-10"
              @click="
                block.url = '';
              emitUpdate();
              ">
              <Pencil :size="14" />
            </button>

            <!-- Caption Input -->
            <input v-model="block.caption" type="text" placeholder="Video caption (optional)..."
              class="w-full text-center text-sm text-muted-foreground mt-4 italic bg-transparent border-none outline-none focus:ring-0 p-0"
              @input="emitUpdate">
          </div>

          <div v-else class="flex flex-col gap-3 p-6 bg-muted/20 border border-border/60 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <div class="p-2 bg-red-500/10 rounded-lg text-red-500">
                <Youtube :size="20" />
              </div>
              <h3 class="font-bold text-sm">Add YouTube Video</h3>
            </div>
            <input v-model="block.url" type="text"
              placeholder="Paste YouTube link here (e.g. https://youtube.com/watch?v=...)"
              class="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-all font-mono"
              @change="emitUpdate" @input="emitUpdate">
            <p class="text-xs text-muted-foreground px-1">Supports standard, short, and embed URLs.</p>
          </div>
        </div>

      </div>

      <!-- Contextual Inserter between blocks -->
      <div class="relative group/inserter h-8 flex items-center justify-center">
        <div
          class="absolute inset-x-0 h-px bg-border/50 opacity-0 group-hover/inserter:opacity-100 transition-opacity" />
        <button type="button"
          class="relative w-8 h-8 rounded-full bg-component border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 hover:scale-110 transition-all opacity-0 group-hover/inserter:opacity-100"
          @click="addBlockAt(index + 1)">
          <Plus :size="16" />
        </button>
      </div>
    </template>

    <!-- Dynamic Insertion Menu (Overlay) -->
    <div v-if="showInserter" :style="{ top: inserterY + 'px' }"
      class="fixed left-1/2 -translate-x-1/2 z-200 bg-component border border-border shadow-2xl rounded-2xl p-2 flex gap-2 animate-in fade-in zoom-in duration-200">
      <button class="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm font-bold"
        @click="insertBlock('text')">
        <FileText :size="16" class="text-blue-500" />
        Text
      </button>
      <button class="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm font-bold"
        @click="insertBlock('image')">
        <ImageIcon :size="16" class="text-emerald-500" />
        Image
      </button>
      <button class="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm font-bold"
        @click="insertBlock('video')">
        <Youtube :size="16" class="text-red-500" />
        Video
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowUp,
  ArrowDown,
  X,
  ImageIcon,
  Pencil,
  ImagePlus,
  FileText,
  Plus,
  Youtube
} from "lucide-vue-next";
import { parseMarkdown } from "~/utils/markdown";

interface Block {
  id: string;
  type: "text" | "image" | "video";
  heading?: string;
  body: string;
  url?: string;
  caption?: string;
}

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);


// Inserter State
const showInserter = ref(false);
const inserterY = ref(0);
const insertIndex = ref(0);

const addBlockAt = (index: number) => {
  insertIndex.value = index;
  showInserter.value = true;
};

const insertBlock = (type: "text" | "image" | "video") => {
  const newBlock: Block = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    heading: "",
    body: "",
    url: "",
    caption: "",
  };
  blocks.value.splice(insertIndex.value, 0, newBlock);
  showInserter.value = false;
  emitUpdate();
};

const extractYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2]?.length === 11) ? match[2] : null;
};

// Initialize blocks from HTML string
const initializeBlocks = (htmlValue: string): Block[] => {
  if (!htmlValue) return [{ id: "init", type: "text", body: "" }];

  const blocksArr: Block[] = [];
  const processedHtml = parseMarkdown(htmlValue);

  // SSR Check
  if (typeof document === 'undefined') {
    return [{
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      body: processedHtml,
    }];
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = processedHtml;

  // We selector for top-level block elements we recognize
  const children = wrapper.children;
  if (children.length === 0 && processedHtml) {
    // Fallback
    blocksArr.push({
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      body: processedHtml,
    });
  }

  Array.from(children).forEach((el) => {
    const id = Math.random().toString(36).substr(2, 9);

    if (el.tagName === "SECTION") {
      const h2 = el.querySelector("h2");
      // Remove H2 from content to avoid duplication in editor
      let content = el.innerHTML;
      if (h2) {
        content = content.replace(h2.outerHTML, "").trim();
      }
      blocksArr.push({
        id,
        type: "text",
        heading: h2?.innerText || "",
        body: content,
      });
    } else if (el.tagName === "FIGURE") {
      // Check if it's an image or video figure
      const img = el.querySelector("img");
      const iframe = el.querySelector("iframe");
      const figcaption = el.querySelector("figcaption");

      if (iframe && iframe.src.includes("youtube")) {
        // It's a video
        // Extract ID from embed URL to reconstruct robustly
        const src = iframe.getAttribute("src") || "";
        // Usually src is https://www.youtube.com/embed/ID
        const videoId = src.split('/').pop();

        blocksArr.push({
          id,
          type: "video",
          url: `https://youtube.com/watch?v=${videoId}`, // Normalize to watch URL for editing
          caption: figcaption?.innerText || "",
          body: ""
        });
      } else if (img) {
        // It's an image
        blocksArr.push({
          id,
          type: "image",
          url: img.getAttribute("src") || "",
          caption: figcaption?.innerText || "",
          body: "",
        });
      }
    } else {
      // Catch-all for parsing simple paragraphs as text blocks
      if (el.tagName === 'P' || el.tagName === 'DIV' || el.tagName === 'UL' || el.tagName === 'OL') {
        blocksArr.push({
          id,
          type: "text",
          heading: "",
          body: el.outerHTML
        });
      }
    }
  });

  return blocksArr.length > 0
    ? blocksArr
    : [{ id: "init", type: "text", body: "" }];
};

const blocks = ref<Block[]>(initializeBlocks(props.modelValue));

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && newVal !== serializeCurrentBlocks()) {
      blocks.value = initializeBlocks(newVal);
    }
  },
);

const serializeCurrentBlocks = () => {
  let html = "";
  blocks.value.forEach((block) => {
    if (block.type === "text") {
      if (!block.heading && !block.body) return;
      html += `<section class="mb-12">`;
      if (block.heading) {
        html += `<h2 class="text-3xl font-bold mb-6 text-foreground tracking-tight">${block.heading}</h2>`;
      }
      if (block.body) {
        html += block.body;
      }
      html += `</section>`;
    } else if (block.type === "image" && block.url) {
      html += `<figure class="my-16 flex flex-col items-center">
                <img src="${block.url}" class="w-full rounded-2xl border border-border shadow-2xl transition-all" alt="Blog Illustration" loading="lazy">`;
      if (block.caption) {
        html += `<figcaption class="mt-4 text-sm text-muted-foreground italic font-medium">${block.caption}</figcaption>`;
      }
      html += `</figure>`;
    } else if (block.type === "video" && block.url) {
      const videoId = extractYoutubeId(block.url);
      if (videoId) {
        html += `<figure class="my-16 flex flex-col items-center w-full">
               <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                 <iframe 
                   class="absolute inset-0 w-full h-full"
                   src="https://www.youtube.com/embed/${videoId}" 
                   title="YouTube video player" 
                   frameborder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   allowfullscreen
                 ></iframe>
               </div>`;
        if (block.caption) {
          html += `<figcaption class="mt-4 text-sm text-muted-foreground italic font-medium">${block.caption}</figcaption>`;
        }
        html += `</figure>`;
      }
    }
  });
  return html;
};

const fileInputs = ref<any>({});

const removeBlock = (index: number) => {
  blocks.value.splice(index, 1);
  if (blocks.value.length === 0) {
    addBlockAt(0);
  }
  emitUpdate();
};

const moveBlock = (index: number, direction: number) => {
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < blocks.value.length) {
    const [removedItem] = blocks.value.splice(index, 1);
    if (removedItem) {
      blocks.value.splice(newIndex, 0, removedItem);
      emitUpdate();
    }
  }
};

const triggerImageUpload = (index: number) => {
  const input = fileInputs.value[index];
  if (input) input.click();
};

const handleImageUpload = async (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    const formDataBody = new FormData()
    formDataBody.append('file', file)

    const response = await $fetch<{ success: boolean; url: string }>('/api/cms/upload', {
      method: 'POST',
      body: formDataBody
    })

    if (!response.success) throw new Error('Upload failed')

    const block = blocks.value[index];
    if (block) {
      block.url = response.url;
      emitUpdate();
    }
  } catch (e) {
    console.error("Upload failed", e);
    alert('Upload failed');
  }
};

const emitUpdate = () => {
  emit("update:modelValue", serializeCurrentBlocks());
};

// Close inserter on click outside
if (import.meta.client) {
  window.addEventListener("click", (e: any) => {
    if (
      showInserter.value &&
      !e.target.closest(".group\\/inserter") &&
      !e.target.closest(".fixed")
    ) {
      showInserter.value = false;
    }
  });
}
</script>

<style scoped>
textarea {
  transition: height 0.1s ease-out;
}
</style>
