<template>
  <div
    class="flex flex-col border border-border/60 rounded-xl overflow-hidden bg-background/50 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 border-b border-border/40 bg-muted/20">
      <!-- History -->
      <div class="flex items-center gap-0.5 pr-2 mr-2 border-r border-border/40">
        <button :disabled="!editor.can().chain().focus().undo().run()"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-30 transition-colors"
          title="Undo" @click="editor.chain().focus().undo().run()">
          <ArrowCounterClockwise :size="16" />
        </button>
        <button :disabled="!editor.can().chain().focus().redo().run()"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-30 transition-colors"
          title="Redo" @click="editor.chain().focus().redo().run()">
          <ArrowClockwise :size="16" />
        </button>
      </div>

      <!-- Text Style -->
      <div class="flex items-center gap-0.5 pr-2 mr-2 border-r border-border/40">
        <button :class="{ 'bg-blue-500/10 text-blue-500': editor.isActive('bold') }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Bold" @click="editor.chain().focus().toggleBold().run()">
          <TextB :size="16" weight="bold" />
        </button>
        <button :class="{ 'bg-blue-500/10 text-blue-500': editor.isActive('italic') }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Italic" @click="editor.chain().focus().toggleItalic().run()">
          <TextItalic :size="16" weight="bold" />
        </button>
        <button :class="{ 'bg-blue-500/10 text-blue-500': editor.isActive('strike') }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Strikethrough" @click="editor.chain().focus().toggleStrike().run()">
          <TextStrikethrough :size="16" weight="bold" />
        </button>
        <button :class="{ 'bg-blue-500/10 text-blue-500': editor.isActive('code') }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Inline Code" @click="editor.chain().focus().toggleCode().run()">
          <Code :size="16" weight="bold" />
        </button>
      </div>

      <!-- Headings -->
      <div class="flex items-center gap-0.5 pr-2 mr-2 border-r border-border/40">
        <button :class="{
          'bg-blue-500/10 text-blue-500': editor.isActive('heading', {
            level: 1,
          }),
        }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-xs font-black"
          title="Heading 1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          H1
        </button>
        <button :class="{
          'bg-blue-500/10 text-blue-500': editor.isActive('heading', {
            level: 2,
          }),
        }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-xs font-bold"
          title="Heading 2" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          H2
        </button>
        <button :class="{
          'bg-blue-500/10 text-blue-500': editor.isActive('heading', {
            level: 3,
          }),
        }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors text-xs font-bold"
          title="Heading 3" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          H3
        </button>
      </div>

      <!-- Lists -->
      <div class="flex items-center gap-0.5 pr-2 mr-2 border-r border-border/40">
        <button :class="{
          'bg-blue-500/10 text-blue-500': editor.isActive('bulletList'),
        }" class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Bullet List" @click="editor.chain().focus().toggleBulletList().run()">
          <ListBullets :size="16" weight="bold" />
        </button>
        <button :class="{
          'bg-blue-500/10 text-blue-500': editor.isActive('orderedList'),
        }" class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Ordered List" @click="editor.chain().focus().toggleOrderedList().run()">
          <ListNumbers :size="16" weight="bold" />
        </button>
      </div>

      <!-- Extras -->
      <div class="flex items-center gap-0.5">
        <button :class="{
          'bg-blue-500/10 text-blue-500': editor.isActive('blockquote'),
        }" class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Blockquote" @click="editor.chain().focus().toggleBlockquote().run()">
          <Quotes :size="16" weight="bold" />
        </button>
        <button :class="{ 'bg-blue-500/10 text-blue-500': editor.isActive('link') }"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Link" @click="setLink">
          <Link :size="16" weight="bold" />
        </button>
        <button class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Image" @click="addImage">
          <Image :size="16" weight="bold" />
        </button>
        <button class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          title="Horizontal Rule" @click="editor.chain().focus().setHorizontalRule().run()">
          <Minus :size="16" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Link Input Popover -->
    <div v-if="showLinkInput"
      class="absolute top-12 left-0 right-0 z-10 px-2 animate-in fade-in zoom-in-95 duration-200">
      <div class="flex items-center gap-2 p-2 bg-background border border-border shadow-xl rounded-xl">
        <input v-model="linkUrl" type="text" placeholder="https://example.com"
          class="flex-1 bg-muted/50 border border-border/50 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
          @keyup.enter="applyLink" @keyup.esc="cancelLink" ref="linkInputRef">
        <button v-if="linkUrl"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
          title="Remove Link" @click="unsetLink">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
        <button
          class="px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-colors"
          @click="applyLink">
          Apply
        </button>
        <button class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          @click="cancelLink">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Image Input Popover -->
    <div v-if="showImageInput"
      class="absolute top-12 left-0 right-0 z-10 px-2 animate-in fade-in zoom-in-95 duration-200">
      <div class="flex items-center gap-2 p-2 bg-background border border-border shadow-xl rounded-xl">
        <input v-model="imageUrl" type="text" placeholder="https://example.com/image.jpg"
          class="flex-1 bg-muted/50 border border-border/50 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium"
          @keyup.enter="applyImage" @keyup.esc="cancelImage" ref="imageInputRef">
        <button
          class="px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-colors"
          @click="applyImage">
          Add Image
        </button>
        <button class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          @click="cancelImage">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <editor-content :editor="editor"
      class="prose dark:prose-invert prose-blue max-w-none p-4 min-h-[150px] outline-none" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { ref, watch, nextTick } from "vue";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
// RE-IMPORTING LUCIDE ICONS
import {
  Bold as TextB,
  Italic as TextItalic,
  Strikethrough as TextStrikethrough,
  Code,
  List as ListBullets,
  ListOrdered as ListNumbers,
  Quote as Quotes,
  Link,
  Image,
  Undo as ArrowCounterClockwise,
  Redo as ArrowClockwise,
  Minus,
} from "lucide-vue-next";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    LinkExtension.configure({
      openOnClick: false,
      HTMLAttributes: {
        class:
          "text-blue-500 hover:text-blue-400 hover:underline cursor-pointer",
      },
    }),
    ImageExtension.configure({
      HTMLAttributes: {
        class: "rounded-xl border border-border my-4 max-w-full",
      },
    }),
    Placeholder.configure({
      placeholder: props.placeholder || "Start writing...",
      emptyEditorClass:
        "is-editor-empty before:content-[attr(data-placeholder)] before:text-muted-foreground/40 before:float-left before:pointer-events-none cursor-text",
    }),
  ],
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert prose-blue focus:outline-none min-h-[150px] text-foreground/90 leading-relaxed max-w-none",
    },
  },
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

// Watch modelValue for external changes (e.g. initial load or reset)
watch(
  () => props.modelValue,
  (newValue) => {
    const isSame = editor.value?.getHTML() === newValue;
    if (isSame) return;
    editor.value?.commands.setContent(newValue, { emitUpdate: false });
  },
);

// Link State
const showLinkInput = ref(false);
const linkUrl = ref("");
const linkInputRef = ref<HTMLInputElement | null>(null);

const setLink = () => {
  const previousUrl = editor.value?.getAttributes("link").href;
  linkUrl.value = previousUrl || "";
  showLinkInput.value = true;
  nextTick(() => {
    linkInputRef.value?.focus();
  });
};

const applyLink = () => {
  if (linkUrl.value === null) return;

  if (linkUrl.value === "") {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();
  } else {
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl.value })
      .run();
  }
  showLinkInput.value = false;
};

const unsetLink = () => {
  editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();
  showLinkInput.value = false;
  linkUrl.value = "";
};

const cancelLink = () => {
  showLinkInput.value = false;
  linkUrl.value = "";
};

// Image State
const showImageInput = ref(false);
const imageUrl = ref("");
const imageInputRef = ref<HTMLInputElement | null>(null);

const addImage = () => {
  showImageInput.value = true;
  imageUrl.value = "";
  nextTick(() => {
    imageInputRef.value?.focus();
  });
};

const applyImage = () => {
  if (imageUrl.value) {
    editor.value?.chain().focus().setImage({ src: imageUrl.value }).run();
  }
  showImageInput.value = false;
  imageUrl.value = "";
};

const cancelImage = () => {
  showImageInput.value = false;
  imageUrl.value = "";
};
</script>

<style>
/* Tiptap-specific styles */
.ProseMirror {
  outline: none;
  min-height: 150px;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: hsl(var(--muted-foreground));
  pointer-events: none;
  height: 0;
  opacity: 0.5;
}

/* Typography Styles Overrides */
.ProseMirror h1 {
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.25;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: hsl(var(--foreground));
}

.ProseMirror h2 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.25;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: hsl(var(--foreground));
}

.ProseMirror h3 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: hsl(var(--foreground));
}

.ProseMirror ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.ProseMirror ol {
  list-style-type: decimal;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.ProseMirror blockquote {
  border-left: 4px solid hsl(var(--primary, 217 91% 60%));
  padding-left: 1.25rem;
  font-style: italic;
  margin: 1.5rem 0;
  background-color: hsla(var(--primary, 217 91% 60%), 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
}

.ProseMirror code {
  background-color: hsl(var(--muted));
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
  color: hsl(var(--primary));
}

.ProseMirror hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid hsl(var(--border));
}
</style>
