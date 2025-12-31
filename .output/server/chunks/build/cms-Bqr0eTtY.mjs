import { _ as __nuxt_component_0 } from './nuxt-link-CD-o4OdI.mjs';
import { defineComponent, ref, watch, computed, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, defineAsyncComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport } from 'vue/server-renderer';
import { ArrowUp, ArrowDown, X, Type, ImageIcon, Pencil, ImagePlus, FileText } from 'lucide-vue-next';
import { u as useSupabaseClient } from './useSupabaseClient-CkLFOMIR.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useNotes } from './useNotes-CxQGPk0k.mjs';
import { u as useProjects } from './useProjects-DMPxBFQ8.mjs';
import { u as useGallery } from './useGallery-DEZYYCOP.mjs';
import { b as useSeoMeta } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ContentBuilder",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useSupabaseClient();
    const initializeBlocks = () => {
      if (!props.modelValue) return [];
      return [{
        id: Math.random().toString(36).substr(2, 9),
        type: "text",
        heading: "Legacy Content",
        body: props.modelValue
      }];
    };
    const blocks = ref(initializeBlocks());
    ref({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-8" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(blocks), (block, index) => {
        _push(`<div class="group relative bg-component border border-border rounded-xl p-4 transition-all hover:border-blue-500/30"><div class="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur rounded-lg p-1 border border-border shadow-sm"><button type="button"${ssrIncludeBooleanAttr(index === 0) ? " disabled" : ""} class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">`);
        _push(ssrRenderComponent(unref(ArrowUp), { size: 16 }, null, _parent));
        _push(`</button><button type="button"${ssrIncludeBooleanAttr(index === unref(blocks).length - 1) ? " disabled" : ""} class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">`);
        _push(ssrRenderComponent(unref(ArrowDown), { size: 16 }, null, _parent));
        _push(`</button><div class="w-px h-3 bg-border mx-0.5"></div><button type="button" class="p-1.5 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500 transition-colors" title="Remove Section">`);
        _push(ssrRenderComponent(unref(X), { size: 16 }, null, _parent));
        _push(`</button></div>`);
        if (block.type === "text") {
          _push(`<div class="flex flex-col gap-3"><label class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(Type), { size: 14 }, null, _parent));
          _push(` Text Section </label><input${ssrRenderAttr("value", block.heading)} type="text" placeholder="Section Heading (Optional)" class="w-full bg-transparent text-lg font-bold placeholder:text-muted-foreground/50 border-none outline-none focus:ring-0 p-0 text-foreground"><textarea rows="4" placeholder="Type your content here..." class="w-full bg-muted/30 rounded-lg p-3 text-sm leading-relaxed border border-transparent focus:border-border outline-none resize-y transition-colors min-h-[100px]">${ssrInterpolate(block.body)}</textarea></div>`);
        } else if (block.type === "image") {
          _push(`<div class="flex flex-col gap-3"><label class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(ImageIcon), { size: 14 }, null, _parent));
          _push(` Image Section </label>`);
          if (block.url) {
            _push(`<div class="relative rounded-lg overflow-hidden border border-border group/image"><img${ssrRenderAttr("src", block.url)} class="w-full max-h-[300px] object-cover bg-muted/50" alt="Section Image"><button type="button" class="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/70">`);
            _push(ssrRenderComponent(unref(Pencil), { size: 14 }, null, _parent));
            _push(`</button></div>`);
          } else {
            _push(`<div class="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">`);
            _push(ssrRenderComponent(unref(ImagePlus), {
              size: 32,
              class: "opacity-50"
            }, null, _parent));
            _push(`<span class="text-xs font-bold uppercase">Upload Image</span><input type="file" class="hidden" accept="image/*"></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><div class="flex gap-4"><button type="button" class="flex-1 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group">`);
      _push(ssrRenderComponent(unref(FileText), {
        class: "group-active:scale-90 transition-transform",
        size: 20
      }, null, _parent));
      _push(` Add Text </button><button type="button" class="flex-1 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group">`);
      _push(ssrRenderComponent(unref(ImagePlus), {
        class: "group-active:scale-90 transition-transform",
        size: 20
      }, null, _parent));
      _push(` Add Image </button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentBuilder.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "ContentBuilder" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectSectionBuilder",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useSupabaseClient();
    const sections = ref(props.modelValue.map((s) => ({
      ...s,
      layout: s.layout || (s.type === "grid" ? "grid" : s.type === "image" ? "image-full" : "text-only"),
      gridInput: s.images ? s.images.join("\n") : ""
    })));
    ref({});
    ref({});
    watch(sections, (newVal) => {
      emit("update:modelValue", newVal.map((s) => {
        const { gridInput, ...rest } = s;
        return rest;
      }));
    }, { deep: true });
    const carousel = ref({
      open: false,
      images: [],
      index: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))} data-v-8796b6a0><!--[-->`);
      ssrRenderList(unref(sections), (section, index) => {
        _push(`<div class="group relative bg-component/10 border border-border/50 rounded-3xl p-8 transition-all hover:border-blue-500/30 shadow-sm overflow-hidden" data-v-8796b6a0><div class="absolute right-6 top-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 bg-background/80 backdrop-blur-md rounded-xl p-1.5 border border-border shadow-lg z-20" data-v-8796b6a0><button type="button"${ssrIncludeBooleanAttr(index === 0) ? " disabled" : ""} class="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="m18 15-6-6-6 6" data-v-8796b6a0></path></svg></button><button type="button"${ssrIncludeBooleanAttr(index === unref(sections).length - 1) ? " disabled" : ""} class="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="m6 9 6 6 6-6" data-v-8796b6a0></path></svg></button><div class="w-px h-4 bg-border mx-1" data-v-8796b6a0></div><button type="button" class="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="M18 6 6 18M6 6l12 12" data-v-8796b6a0></path></svg></button></div><div class="flex flex-col gap-8" data-v-8796b6a0><div class="flex items-center gap-3 border-b border-border/30 pb-4" data-v-8796b6a0><span class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-black" data-v-8796b6a0>${ssrInterpolate(index + 1)}</span><input${ssrRenderAttr("value", section.title)} type="text" placeholder="Section Title (e.g. Discovery)" class="grow bg-transparent border-none text-lg font-bold placeholder:text-muted-foreground/30 focus:ring-0 p-0 text-foreground" data-v-8796b6a0></div><div class="grid grid-cols-1 md:grid-cols-12 gap-10" data-v-8796b6a0><div class="md:col-span-12 flex flex-col gap-6" data-v-8796b6a0><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-8796b6a0><div class="flex flex-col gap-2" data-v-8796b6a0><label class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1" data-v-8796b6a0>Layout Strategy</label><select class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none appearance-none cursor-pointer" data-v-8796b6a0><option value="text-only" data-v-8796b6a0${ssrIncludeBooleanAttr(Array.isArray(section.layout) ? ssrLooseContain(section.layout, "text-only") : ssrLooseEqual(section.layout, "text-only")) ? " selected" : ""}>Text Only</option><option value="image-full" data-v-8796b6a0${ssrIncludeBooleanAttr(Array.isArray(section.layout) ? ssrLooseContain(section.layout, "image-full") : ssrLooseEqual(section.layout, "image-full")) ? " selected" : ""}>Full Width Image</option><option value="split-left" data-v-8796b6a0${ssrIncludeBooleanAttr(Array.isArray(section.layout) ? ssrLooseContain(section.layout, "split-left") : ssrLooseEqual(section.layout, "split-left")) ? " selected" : ""}>Image Left / Text Right</option><option value="split-right" data-v-8796b6a0${ssrIncludeBooleanAttr(Array.isArray(section.layout) ? ssrLooseContain(section.layout, "split-right") : ssrLooseEqual(section.layout, "split-right")) ? " selected" : ""}>Text Left / Image Right</option><option value="grid" data-v-8796b6a0${ssrIncludeBooleanAttr(Array.isArray(section.layout) ? ssrLooseContain(section.layout, "grid") : ssrLooseEqual(section.layout, "grid")) ? " selected" : ""}>Image Grid</option></select></div>`);
        if (section.layout !== "text-only") {
          _push(`<div class="flex flex-col gap-2" data-v-8796b6a0><label class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1" data-v-8796b6a0>Actions</label>`);
          if (["image-full", "split-left", "split-right"].includes(section.layout)) {
            _push(`<button type="button" class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-border hover:border-blue-500 hover:bg-blue-500/5 transition-all text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-blue-500" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" data-v-8796b6a0></path></svg> ${ssrInterpolate(section.image ? "Change Asset" : "Upload Asset")}</button>`);
          } else if (section.layout === "grid") {
            _push(`<button type="button" class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-border hover:border-blue-500 hover:bg-blue-500/5 transition-all text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-blue-500" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" data-v-8796b6a0></path></svg> Add Photos to Grid </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<input type="file" class="hidden" accept="image/*" data-v-8796b6a0><input type="file" class="hidden" accept="image/*" multiple data-v-8796b6a0></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (section.layout !== "text-only") {
          _push(`<div class="flex flex-col gap-4" data-v-8796b6a0>`);
          if (["image-full", "split-left", "split-right"].includes(section.layout)) {
            _push(`<input${ssrRenderAttr("value", section.image)} type="text" placeholder="External Asset URL..." class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-2 text-[10px] font-mono focus:border-blue-500 outline-none w-full" data-v-8796b6a0>`);
          } else {
            _push(`<!---->`);
          }
          if (section.layout === "grid") {
            _push(`<textarea rows="3" placeholder="Grid Image URLs (one per line)..." class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-3 text-[10px] font-mono focus:border-blue-500 outline-none resize-none shadow-inner w-full" data-v-8796b6a0>${ssrInterpolate(section.gridInput)}</textarea>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (section.layout !== "text-only" && (section.image || section.images && section.images.length > 0)) {
          _push(`<div class="flex flex-wrap gap-4 p-4 bg-muted/20 rounded-2xl border border-border/30" data-v-8796b6a0>`);
          if (["image-full", "split-left", "split-right"].includes(section.layout) && section.image) {
            _push(`<div class="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-border hover:border-blue-500 transition-all cursor-pointer group/thumb shadow-md" data-v-8796b6a0><img${ssrRenderAttr("src", section.image)} class="w-full h-full object-cover transition-transform group-hover/thumb:scale-110" data-v-8796b6a0><div class="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white" data-v-8796b6a0><circle cx="11" cy="11" r="8" data-v-8796b6a0></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-8796b6a0></line><line x1="11" y1="8" x2="11" y2="14" data-v-8796b6a0></line><line x1="8" y1="11" x2="14" y2="11" data-v-8796b6a0></line></svg></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (section.layout === "grid") {
            _push(`<!--[-->`);
            ssrRenderList(section.images, (img, imgIdx) => {
              _push(`<div class="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-border hover:border-blue-500 transition-all cursor-pointer group/thumb shadow-md" data-v-8796b6a0><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover transition-transform group-hover/thumb:scale-110" data-v-8796b6a0><div class="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white" data-v-8796b6a0><circle cx="11" cy="11" r="8" data-v-8796b6a0></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-8796b6a0></line><line x1="11" y1="8" x2="11" y2="14" data-v-8796b6a0></line><line x1="8" y1="11" x2="14" y2="11" data-v-8796b6a0></line></svg></div><button class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-all hover:scale-110 shadow-lg" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="M18 6 6 18M6 6l12 12" data-v-8796b6a0></path></svg></button></div>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col gap-2" data-v-8796b6a0><label class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1" data-v-8796b6a0>Narrative Content</label><textarea rows="6" placeholder="Type the story for this step..." class="cms-input bg-background/50 border-2 border-border rounded-2xl px-6 py-5 text-sm focus:border-blue-500 outline-none resize-none leading-relaxed shadow-inner" data-v-8796b6a0>${ssrInterpolate(section.content)}</textarea></div></div></div></div></div>`);
      });
      _push(`<!--]--><button type="button" class="w-full py-8 border-2 border-dashed border-border/50 rounded-[2.5rem] text-muted-foreground font-black uppercase tracking-[0.2em] text-[12px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-4 group active:scale-[0.98]" data-v-8796b6a0><div class="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:rotate-90" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><line x1="12" y1="5" x2="12" y2="19" data-v-8796b6a0></line><line x1="5" y1="12" x2="19" y2="12" data-v-8796b6a0></line></svg></div> Add Story Section </button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(carousel).open) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-20 bg-black/95 backdrop-blur-2xl" data-v-8796b6a0><button class="absolute top-8 right-8 p-4 text-white/50 hover:text-white transition-all hover:rotate-90 z-10" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="M18 6 6 18M6 6l12 12" data-v-8796b6a0></path></svg></button><div class="relative w-full h-full flex items-center justify-center" data-v-8796b6a0>`);
          if (unref(carousel).images.length > 1) {
            _push2(`<button class="absolute left-0 p-6 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 backdrop-blur-md z-10" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="m15 18-6-6 6-6" data-v-8796b6a0></path></svg></button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="max-w-7xl max-h-full flex flex-col gap-8 items-center" data-v-8796b6a0><img${ssrRenderAttr("src", unref(carousel).images[unref(carousel).index])} class="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(59,130,246,0.3)] animate-carousel-in" data-v-8796b6a0>`);
          if (unref(carousel).images.length > 1) {
            _push2(`<div class="flex items-center gap-3" data-v-8796b6a0><!--[-->`);
            ssrRenderList(unref(carousel).images, (_, i) => {
              _push2(`<div class="${ssrRenderClass([i === unref(carousel).index ? "bg-blue-500 w-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-white/20 hover:bg-white/40", "w-2.5 h-2.5 rounded-full transition-all cursor-pointer"])}" data-v-8796b6a0></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (unref(carousel).images.length > 1) {
            _push2(`<button class="absolute right-0 p-6 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 backdrop-blur-md z-10" data-v-8796b6a0><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8796b6a0><path d="m9 18 6-6-6-6" data-v-8796b6a0></path></svg></button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectSectionBuilder.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-8796b6a0"]]), { __name: "ProjectSectionBuilder" });
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./SecuritySetup-_uqyw_82.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cms",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const { notes } = useNotes();
    const { projects } = useProjects();
    const { galleryItems } = useGallery();
    const loading = ref(true);
    const isSidebarOpen = ref(false);
    const activeTab = ref("notes");
    const view = ref("list");
    const isEditing = ref(false);
    const isUploading = ref(false);
    const pendingUploads = ref(0);
    const formData = ref({});
    const tagsInput = ref("");
    const toolsInput = ref("");
    const wireframesInput = ref("");
    const isAiGenerating = ref(false);
    const aiPrompt = ref("");
    const showAiModal = ref(false);
    const aiMode = ref("sections");
    ref("");
    const toast = ref({
      show: false,
      title: "",
      message: "",
      type: "success"
    });
    watch(() => formData.value.title, (newTitle) => {
      if (!isEditing.value && newTitle) {
        formData.value.slug = newTitle.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
      }
    });
    const promptChips = computed(() => {
      if (aiMode.value === "sections") {
        return ["Discovery", "Design Process", "Final Results", "Tech Stack"];
      }
      return ["Summarize accurately", "Make it compelling", "Professional tone", "Focus on impact"];
    });
    const toastClasses = computed(() => {
      switch (toast.value.type) {
        case "success":
          return "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20";
        case "error":
          return "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 dark:bg-red-500/20";
        case "warning":
          return "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20";
        default:
          return "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20";
      }
    });
    const activeItems = computed(() => activeTab.value === "notes" ? notes.value : projects.value);
    const securitySetup = ref(null);
    const cmsHeaderTitle = computed(() => {
      if (activeTab.value === "gallery") return "Photo Gallery";
      return activeTab.value === "notes" ? "Notes Database" : "Project Portfolio";
    });
    const activeTabLabel = computed(() => {
      if (activeTab.value === "gallery") return "Photo";
      return activeTab.value === "notes" ? "Note" : "Project";
    });
    const editHeaderTitle = computed(() => `${isEditing.value ? "Refine" : "Add"} ${activeTabLabel.value}`);
    useSeoMeta({ title: "CMS Control Center - Lanre Segun", robots: "noindex, nofollow" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentBuilder = __nuxt_component_1;
      const _component_ProjectSectionBuilder = __nuxt_component_2;
      const _component_LazySecuritySetup = __nuxt_component_3_lazy;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground font-sans selection:bg-neutral-800 transition-colors duration-300" }, _attrs))} data-v-8fcb72fb>`);
      if (unref(toast).show) {
        _push(`<div class="${ssrRenderClass([unref(toastClasses), "fixed top-20 lg:top-6 right-6 z-200 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[300px] lg:min-w-[320px]"])}" data-v-8fcb72fb><div class="shrink-0" data-v-8fcb72fb>`);
        if (unref(toast).type === "success") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><polyline points="20 6 9 17 4 12" data-v-8fcb72fb></polyline></svg>`);
        } else if (unref(toast).type === "error") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><circle cx="12" cy="12" r="10" data-v-8fcb72fb></circle><line x1="15" y1="9" x2="9" y2="15" data-v-8fcb72fb></line><line x1="9" y1="9" x2="15" y2="15" data-v-8fcb72fb></line></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><circle cx="12" cy="12" r="10" data-v-8fcb72fb></circle><line x1="12" y1="8" x2="12" y2="12" data-v-8fcb72fb></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-8fcb72fb></line></svg>`);
        }
        _push(`</div><div class="grow" data-v-8fcb72fb><p class="text-sm font-bold tracking-tight" data-v-8fcb72fb>${ssrInterpolate(unref(toast).title)}</p><p class="text-xs opacity-80" data-v-8fcb72fb>${ssrInterpolate(unref(toast).message)}</p></div><button class="opacity-50 hover:opacity-100 transition-opacity" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><line x1="18" y1="6" x2="6" y2="18" data-v-8fcb72fb></line><line x1="6" y1="6" x2="18" y2="18" data-v-8fcb72fb></line></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-160 flex items-center justify-between px-6 transition-colors" data-v-8fcb72fb><h1 class="text-xl font-display font-medium tracking-tight text-foreground" data-v-8fcb72fb>Local CMS</h1><button class="p-2 -mr-2 text-muted-foreground hover:text-foreground" data-v-8fcb72fb>`);
      if (!unref(isSidebarOpen)) {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8fcb72fb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-v-8fcb72fb></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8fcb72fb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-8fcb72fb></path></svg>`);
      }
      _push(`</button></div><div class="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-140 backdrop-blur-sm transition-opacity duration-300" style="${ssrRenderStyle(unref(isSidebarOpen) ? null : { display: "none" })}" data-v-8fcb72fb></div><aside class="${ssrRenderClass([
        "fixed left-0 top-0 h-full w-64 border-r border-border bg-component dark:bg-black/90 p-6 flex flex-col gap-8 backdrop-blur-xl z-150 transition-transform duration-300 lg:translate-x-0",
        unref(isSidebarOpen) ? "translate-x-0" : "-translate-x-full"
      ])}" data-v-8fcb72fb><h1 class="hidden lg:block text-2xl font-display font-black tracking-tight text-foreground" data-v-8fcb72fb>Local CMS</h1><nav class="flex flex-col gap-2 pt-20 lg:pt-0" data-v-8fcb72fb><button class="${ssrRenderClass([unref(activeTab) === "notes" ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "px-4 py-2.5 rounded-xl text-left transition-all duration-300 flex items-center gap-3 group"])}" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover:opacity-100" data-v-8fcb72fb><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" data-v-8fcb72fb></path><polyline points="14 2 14 8 20 8" data-v-8fcb72fb></polyline></svg><span data-v-8fcb72fb>Notes</span></button><button class="${ssrRenderClass([unref(activeTab) === "projects" ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "px-4 py-2.5 rounded-xl text-left transition-all duration-300 flex items-center gap-3 group"])}" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover:opacity-100" data-v-8fcb72fb><path d="M12 2H2v10h10V2zM12 12H2v10h10V12zM22 2h-10v10h10V2zM22 12h-10v10h10V12z" data-v-8fcb72fb></path></svg><span data-v-8fcb72fb>Projects</span></button><button class="${ssrRenderClass([unref(activeTab) === "gallery" ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20" : "text-muted-foreground hover:bg-muted hover:text-foreground", "px-4 py-2.5 rounded-xl text-left transition-all duration-300 flex items-center gap-3 group"])}" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70 group-hover:opacity-100" data-v-8fcb72fb><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-8fcb72fb></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-8fcb72fb></circle><polyline points="21 15 16 10 5 21" data-v-8fcb72fb></polyline></svg><span data-v-8fcb72fb>Gallery</span></button></nav><div class="mt-auto" data-v-8fcb72fb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb${_scopeId}><path d="M15 18l-6-6 6-6" data-v-8fcb72fb${_scopeId}></path></svg> Back to Website `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("path", { d: "M15 18l-6-6 6-6" })
              ])),
              createTextVNode(" Back to Website ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="${ssrRenderClass(["lg:ml-64 p-6 lg:p-12 max-w-full lg:max-w-5xl transition-all pt-24 lg:pt-12"])}" data-v-8fcb72fb>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center py-20" data-v-8fcb72fb><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" data-v-8fcb72fb></div></div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(view) === "list") {
          _push(`<div class="flex flex-col gap-8" data-v-8fcb72fb><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4" data-v-8fcb72fb><div class="flex flex-col gap-1" data-v-8fcb72fb><h2 class="text-2xl lg:text-3xl font-bold tracking-tight text-foreground" data-v-8fcb72fb>${ssrInterpolate(unref(cmsHeaderTitle))}</h2><p class="text-xs text-muted-foreground font-medium" data-v-8fcb72fb>Manage and curate your ${ssrInterpolate(unref(activeTabLabel).toLowerCase())} collection</p></div><button class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2.5 active:scale-95 group" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300" data-v-8fcb72fb><line x1="12" y1="5" x2="12" y2="19" data-v-8fcb72fb></line><line x1="5" y1="12" x2="19" y2="12" data-v-8fcb72fb></line></svg><span class="uppercase tracking-widest text-[11px]" data-v-8fcb72fb>New ${ssrInterpolate(unref(activeTabLabel))}</span></button></div><div class="flex flex-col gap-4" data-v-8fcb72fb>`);
          if (unref(activeTab) === "gallery") {
            _push(`<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4" data-v-8fcb72fb><!--[-->`);
            ssrRenderList(unref(pendingUploads), (n) => {
              _push(`<div class="aspect-3/4 bg-muted rounded-xl animate-pulse flex items-center justify-center border border-border" data-v-8fcb72fb><svg class="w-8 h-8 text-muted-foreground/20 animate-spin" fill="none" viewBox="0 0 24 24" data-v-8fcb72fb><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-8fcb72fb></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-8fcb72fb></path></svg></div>`);
            });
            _push(`<!--]--><!--[-->`);
            ssrRenderList(unref(galleryItems), (item) => {
              _push(`<div class="group relative aspect-4/3 bg-muted rounded-xl overflow-hidden border border-border" data-v-8fcb72fb><img${ssrRenderAttr("src", item.url)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-v-8fcb72fb><div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4" data-v-8fcb72fb><button class="w-full py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors" data-v-8fcb72fb> Delete </button></div></div>`);
            });
            _push(`<!--]--><button class="aspect-4/3 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-all group bg-component/10" data-v-8fcb72fb><div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><line x1="12" y1="5" x2="12" y2="19" data-v-8fcb72fb></line><line x1="5" y1="12" x2="19" y2="12" data-v-8fcb72fb></line></svg></div><span class="text-[10px] font-black text-muted-foreground tracking-[0.2em] uppercase group-hover:text-foreground transition-colors" data-v-8fcb72fb>Add Photos</span><input type="file" class="hidden" multiple accept="image/*" data-v-8fcb72fb></button></div>`);
          } else {
            _push(`<!--[--><!--[-->`);
            ssrRenderList(unref(activeItems), (item) => {
              _push(`<div class="p-5 rounded-2xl border border-border bg-component/50 dark:bg-white/2 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group" data-v-8fcb72fb><div class="flex flex-col gap-1.5 grow" data-v-8fcb72fb><div class="flex items-center gap-2" data-v-8fcb72fb><h3 class="font-bold text-base lg:text-lg text-foreground group-hover:text-blue-500 transition-colors leading-tight" data-v-8fcb72fb>${ssrInterpolate(item.title)}</h3>`);
              if (unref(activeTab) !== "gallery") {
                _push(ssrRenderComponent(_component_NuxtLink, {
                  to: unref(activeTab) === "notes" ? `/notes/${item.slug}` : `/projects/${item.slug}`,
                  target: "_blank",
                  class: "p-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all",
                  title: "View Live"
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb${_scopeId}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" data-v-8fcb72fb${_scopeId}></path></svg>`);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "14",
                          height: "14",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.5",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round"
                        }, [
                          createVNode("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" })
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<!---->`);
              }
              _push(`</div><div class="flex items-center gap-2 text-xs font-medium text-muted-foreground" data-v-8fcb72fb><span class="px-2 py-0.5 bg-muted rounded uppercase tracking-wider" data-v-8fcb72fb>${ssrInterpolate(item.year)}</span><span class="opacity-40" data-v-8fcb72fb>•</span><span class="font-mono text-[10px]" data-v-8fcb72fb>${ssrInterpolate(item.slug)}</span></div></div><div class="flex items-center gap-3" data-v-8fcb72fb><button class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-foreground hover:text-background transition-all" data-v-8fcb72fb> Edit </button><button class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" data-v-8fcb72fb> Delete </button></div></div>`);
            });
            _push(`<!--]-->`);
            if (unref(activeItems).length === 0) {
              _push(`<div class="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border" data-v-8fcb72fb><p class="text-muted-foreground font-medium" data-v-8fcb72fb>No items found in ${ssrInterpolate(unref(activeTab))}.</p><button class="mt-4 text-blue-500 font-bold hover:underline" data-v-8fcb72fb>Create your first now</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<div class="flex flex-col gap-8" data-v-8fcb72fb><div class="flex items-center gap-4 mb-4" data-v-8fcb72fb><button class="p-2 bg-muted hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><path d="M19 12H5" data-v-8fcb72fb></path><path d="M12 19l-7-7 7-7" data-v-8fcb72fb></path></svg></button><h2 class="text-xl lg:text-2xl font-bold text-foreground" data-v-8fcb72fb>${ssrInterpolate(unref(editHeaderTitle))}</h2></div><form class="flex flex-col gap-10 lg:max-w-5xl pb-32" data-v-8fcb72fb><section class="flex flex-col gap-10 bg-component/10 p-8 lg:p-10 rounded-[2.5rem] border border-border/50 shadow-sm relative overflow-hidden group/section" data-v-8fcb72fb><div class="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-focus-within/section:opacity-100 transition-opacity" data-v-8fcb72fb></div><div class="flex items-center gap-4" data-v-8fcb72fb><div class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" data-v-8fcb72fb></path><polyline points="14 2 14 8 20 8" data-v-8fcb72fb></polyline></svg></div><div class="flex flex-col gap-0.5" data-v-8fcb72fb><h3 class="text-sm font-black uppercase tracking-[0.2em] text-foreground/80" data-v-8fcb72fb>Basic Metadata</h3><p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest" data-v-8fcb72fb> Core project identification</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-8fcb72fb><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Display Title</label><input${ssrRenderAttr("value", unref(formData).title)} type="text" required placeholder="Project Name" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Identifier (Slug)</label><input${ssrRenderAttr("value", unref(formData).slug)} type="text" required placeholder="project-slug" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Short Subtitle</label><input${ssrRenderAttr("value", unref(formData).subtitle)} type="text" placeholder="Design System Architecture" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Publication Year</label><input${ssrRenderAttr("value", unref(formData).year)} type="text" placeholder="2024" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Live Project Link (URL or Iframe)</label><input${ssrRenderAttr("value", unref(formData).projectLink)} type="text" placeholder="Paste link or full &lt;iframe&gt; code..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed" data-v-8fcb72fb></div><div class="flex items-center gap-3 px-1 pt-2" data-v-8fcb72fb><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).isFigma) ? ssrLooseContain(unref(formData).isFigma, null) : unref(formData).isFigma) ? " checked" : ""} id="isFigma" class="w-5 h-5 rounded border-border text-blue-500 focus:ring-blue-500 bg-background" data-v-8fcb72fb><label for="isFigma" class="text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer" data-v-8fcb72fb>This is a Figma Prototype</label></div><div class="flex flex-col gap-3 lg:col-span-2" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Featured Image / Cover</label><button type="button"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400" data-v-8fcb72fb><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8fcb72fb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" data-v-8fcb72fb></path></svg> ${ssrInterpolate(unref(isUploading) ? "Uploading..." : "Upload Image")}</button><input type="file" class="hidden" accept="image/*" data-v-8fcb72fb></div><input${ssrRenderAttr("value", unref(formData).coverImage)} type="text" placeholder="https://..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed" data-v-8fcb72fb><p class="text-[10px] text-muted-foreground px-1 font-medium italic" data-v-8fcb72fb>Max 5MB. Ideal ratio 16:9 for optimal accessibility.</p></div></div></section><section class="flex flex-col gap-10 bg-component/10 p-8 lg:p-10 rounded-[2.5rem] border border-border/50 shadow-sm relative overflow-hidden group/section" data-v-8fcb72fb><div class="absolute top-0 left-0 w-1 h-full bg-emerald-600 opacity-0 group-focus-within/section:opacity-100 transition-opacity" data-v-8fcb72fb></div><div class="flex items-center gap-4" data-v-8fcb72fb><div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner" data-v-8fcb72fb><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-8fcb72fb><path d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" data-v-8fcb72fb></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" data-v-8fcb72fb></path></svg></div><div class="flex flex-col gap-0.5" data-v-8fcb72fb><h3 class="text-sm font-black uppercase tracking-[0.2em] text-foreground/80" data-v-8fcb72fb>Rich Content</h3><p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest" data-v-8fcb72fb> Storytelling and case study details</p></div></div>`);
          if (unref(activeTab) === "notes") {
            _push(`<div class="flex flex-col gap-8" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Excerpt (Card Preview)</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-3 h-3 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="2" placeholder="Brief summary of the note..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).excerpt)}</textarea><div class="flex flex-col gap-2.5 mt-8" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-8fcb72fb>Body Text (Supports Markdown)</label><button type="button"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400" data-v-8fcb72fb><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8fcb72fb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-8fcb72fb></path></svg> Insert Image </button><input type="file" class="hidden" accept="image/*" data-v-8fcb72fb></div><div class="min-h-[500px]" data-v-8fcb72fb>`);
            _push(ssrRenderComponent(_component_ContentBuilder, {
              modelValue: unref(formData).content,
              "onUpdate:modelValue": ($event) => unref(formData).content = $event
            }, null, _parent));
            _push(`</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(activeTab) === "projects") {
            _push(`<div class="flex flex-col gap-10" data-v-8fcb72fb><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-8fcb72fb><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Client Name</label><input${ssrRenderAttr("value", unref(formData).client)} type="text" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Role</label><input${ssrRenderAttr("value", unref(formData).role)} type="text" placeholder="Lead Product Designer" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Industry</label><input${ssrRenderAttr("value", unref(formData).industry)} type="text" placeholder="Fintech, SaaS, etc." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Duration</label><input${ssrRenderAttr("value", unref(formData).duration)} type="text" placeholder="3 Months" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Team Size</label><input${ssrRenderAttr("value", unref(formData).teamSize)} type="text" placeholder="5 Members" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-8fcb72fb></div></div><div class="flex flex-col gap-8 pt-6 border-t border-border" data-v-8fcb72fb><h4 class="text-sm font-bold uppercase tracking-widest text-blue-500" data-v-8fcb72fb>Project Narrative</h4><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Project Introduction</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-3 h-3 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="3" placeholder="A brief hook about the project..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).content.introduction)}</textarea><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Problem Statement</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-3 h-3 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="3" placeholder="What challenge were we solving?" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).problemStatement)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-8fcb72fb><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Business Goal</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="2" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).businessGoal)}</textarea></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>User Goal</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="2" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).userGoal)}</textarea></div></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Design Approach</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="3" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).designApproach)}</textarea></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Target Users</label><input${ssrRenderAttr("value", unref(formData).targetUsers)} type="text" placeholder="Gen Z, Professionals, etc." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm" data-v-8fcb72fb></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-8fcb72fb><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Research Methods</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="2" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).researchMethods)}</textarea></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Key Insights</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="2" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).keyInsights)}</textarea></div></div></div><div class="flex flex-col gap-8 pt-6 border-t border-border" data-v-8fcb72fb><h4 class="text-sm font-bold uppercase tracking-widest text-blue-500" data-v-8fcb72fb>Assets &amp; Tools </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-8fcb72fb><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Tags (Comma Separated)</label><input${ssrRenderAttr("value", unref(tagsInput))} type="text" placeholder="Design System, SaaS, React" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground" data-v-8fcb72fb></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Tools (Comma Separated)</label><input${ssrRenderAttr("value", unref(toolsInput))} type="text" placeholder="Figma, Adobe, Midjourney" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground" data-v-8fcb72fb></div></div><div class="flex flex-col gap-4" data-v-8fcb72fb><div class="flex justify-between items-end px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-8fcb72fb>Gallery Assets (Wireframes)</label><button type="button"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="text-[11px] font-bold text-blue-500 uppercase bg-blue-500/10 px-4 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors" data-v-8fcb72fb> Add to Gallery </button><input type="file" class="hidden" multiple accept="image/*" data-v-8fcb72fb></div><textarea rows="4" placeholder="Full URLs to images, one per line" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(wireframesInput))}</textarea></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Solution Summary</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="3" placeholder="Direct response to the problem..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).solutionSummary)}</textarea></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Outcome / Conclusion</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="3" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).outcome)}</textarea></div><div class="flex flex-col gap-2.5" data-v-8fcb72fb><div class="flex justify-between items-center px-1" data-v-8fcb72fb><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-8fcb72fb>Key Learnings</label><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-2.5 h-2.5 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div><textarea rows="3" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(formData).learnings)}</textarea></div></div><div class="flex flex-col gap-8 pt-6 border-t border-border" data-v-8fcb72fb><div class="flex items-center justify-between gap-4" data-v-8fcb72fb><div class="flex flex-col gap-1" data-v-8fcb72fb><h4 class="text-sm font-bold uppercase tracking-widest text-blue-500" data-v-8fcb72fb> Execution Process</h4><p class="text-[10px] text-muted-foreground px-1 font-medium italic" data-v-8fcb72fb>Define the step-by-step journey of this project (Research, Ideation, etc).</p></div><button type="button" class="btn-gemini" data-v-8fcb72fb><svg class="w-3 h-3 text-[#C084FC]" viewBox="0 0 24 24" fill="currentColor" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg><span class="text-gemini" data-v-8fcb72fb>Gemini</span></button></div>`);
            _push(ssrRenderComponent(_component_ProjectSectionBuilder, {
              modelValue: unref(formData).content.sections,
              "onUpdate:modelValue": ($event) => unref(formData).content.sections = $event
            }, null, _parent));
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section><div class="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 dark:bg-black/90 backdrop-blur-xl border-t border-border p-5 lg:p-8 z-100 flex gap-4 lg:justify-end shadow-2xl transition-colors" data-v-8fcb72fb><button type="button" class="flex-1 lg:flex-none px-8 py-3.5 rounded-2xl border-2 border-border font-bold text-foreground hover:bg-muted active:scale-95 transition-all text-sm uppercase tracking-widest" data-v-8fcb72fb> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="flex-2 lg:flex-none px-12 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-xl shadow-blue-500/20 text-sm uppercase tracking-widest disabled:opacity-50 active:scale-95" data-v-8fcb72fb>${ssrInterpolate(unref(isUploading) ? "Syncing..." : unref(isEditing) ? "Update Entry" : "Publish Entry")}</button></div></form></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</main>`);
      if (unref(showAiModal)) {
        _push(`<div class="fixed inset-0 z-200 flex items-center justify-center p-6" data-v-8fcb72fb><div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-v-8fcb72fb></div><div class="relative w-full max-w-md bg-background border border-border p-8 rounded-[32px] shadow-2xl flex flex-col gap-6 animate-fade-in-up" data-v-8fcb72fb><div class="flex items-center gap-4" data-v-8fcb72fb><div class="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white" data-v-8fcb72fb><svg class="w-5 h-5 fill-white" viewBox="0 0 24 24" data-v-8fcb72fb><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" data-v-8fcb72fb></path></svg></div><div data-v-8fcb72fb><h3 class="font-bold text-lg" data-v-8fcb72fb>AI Content Assistant</h3><p class="text-xs text-muted-foreground" data-v-8fcb72fb>Draft your process using Gemini</p></div></div><div class="flex flex-col gap-4" data-v-8fcb72fb><label class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1" data-v-8fcb72fb>What should I focus on?</label><div class="flex flex-wrap gap-2 mb-1" data-v-8fcb72fb><!--[-->`);
        ssrRenderList(unref(promptChips), (chip) => {
          _push(`<button type="button" class="px-3 py-1.5 rounded-full bg-muted/50 border border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50 transition-all" data-v-8fcb72fb>${ssrInterpolate(chip)}</button>`);
        });
        _push(`<!--]--></div><textarea rows="4" placeholder="e.g. Focus on how we built the design system and tested it with 10 user interviews..." class="cms-input bg-muted/30 border-2 border-border rounded-2xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" data-v-8fcb72fb>${ssrInterpolate(unref(aiPrompt))}</textarea></div><div class="flex gap-3" data-v-8fcb72fb><button class="flex-1 px-6 py-3 rounded-xl border border-border text-sm font-bold hover:bg-muted transition-colors" data-v-8fcb72fb>Cancel</button><button${ssrIncludeBooleanAttr(unref(isAiGenerating) || !unref(aiPrompt)) ? " disabled" : ""} class="btn-gemini-primary flex-2" data-v-8fcb72fb>`);
        if (unref(isAiGenerating)) {
          _push(`<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-8fcb72fb></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isAiGenerating) ? "Synergizing..." : "Gemini")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_LazySecuritySetup, {
        ref_key: "securitySetup",
        ref: securitySetup
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8fcb72fb"]]);

export { cms as default };
//# sourceMappingURL=cms-Bqr0eTtY.mjs.map
