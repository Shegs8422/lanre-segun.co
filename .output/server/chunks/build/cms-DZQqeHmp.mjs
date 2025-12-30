import { _ as __nuxt_component_0 } from './nuxt-link-BPu0_itI.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, defineAsyncComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ArrowUp, ArrowDown, X, Type, ImageIcon, Pencil, ImagePlus, FileText } from 'lucide-vue-next';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';
import { u as useNotes } from './useNotes-D7icjz58.mjs';
import { u as useProjects } from './useProjects-l3tY2PNV.mjs';
import { b as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentBuilder.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "ContentBuilder" });
const __nuxt_component_2_lazy = defineAsyncComponent(() => import('./SecuritySetup-_uqyw_82.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cms",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const { notes } = useNotes();
    const { projects } = useProjects();
    const loading = ref(true);
    const isSidebarOpen = ref(false);
    const activeTab = ref("notes");
    const view = ref("list");
    const isEditing = ref(false);
    const isUploading = ref(false);
    const formData = ref({});
    const tagsInput = ref("");
    const wireframesInput = ref("");
    const toast = ref({
      show: false,
      title: "",
      message: "",
      type: "success"
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
    const cmsHeaderTitle = computed(() => activeTab.value === "notes" ? "Notes Database" : "Project Portfolio");
    const activeTabLabel = computed(() => activeTab.value === "notes" ? "Note" : "Project");
    const editHeaderTitle = computed(() => `${isEditing.value ? "Refine" : "Add"} ${activeTabLabel.value}`);
    useSeoMeta({ title: "CMS Control Center - Lanre Segun", robots: "noindex, nofollow" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentBuilder = __nuxt_component_1;
      const _component_LazySecuritySetup = __nuxt_component_2_lazy;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground font-sans selection:bg-neutral-800 transition-colors duration-300" }, _attrs))} data-v-c34d3532>`);
      if (unref(toast).show) {
        _push(`<div class="${ssrRenderClass([unref(toastClasses), "fixed top-20 lg:top-6 right-6 z-200 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[300px] lg:min-w-[320px]"])}" data-v-c34d3532><div class="shrink-0" data-v-c34d3532>`);
        if (unref(toast).type === "success") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532><polyline points="20 6 9 17 4 12" data-v-c34d3532></polyline></svg>`);
        } else if (unref(toast).type === "error") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532><circle cx="12" cy="12" r="10" data-v-c34d3532></circle><line x1="15" y1="9" x2="9" y2="15" data-v-c34d3532></line><line x1="9" y1="9" x2="15" y2="15" data-v-c34d3532></line></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532><circle cx="12" cy="12" r="10" data-v-c34d3532></circle><line x1="12" y1="8" x2="12" y2="12" data-v-c34d3532></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-c34d3532></line></svg>`);
        }
        _push(`</div><div class="grow" data-v-c34d3532><p class="text-sm font-bold tracking-tight" data-v-c34d3532>${ssrInterpolate(unref(toast).title)}</p><p class="text-xs opacity-80" data-v-c34d3532>${ssrInterpolate(unref(toast).message)}</p></div><button class="opacity-50 hover:opacity-100 transition-opacity" data-v-c34d3532><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532><line x1="18" y1="6" x2="6" y2="18" data-v-c34d3532></line><line x1="6" y1="6" x2="18" y2="18" data-v-c34d3532></line></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-160 flex items-center justify-between px-6 transition-colors" data-v-c34d3532><h1 class="text-xl font-bold tracking-tight text-foreground" data-v-c34d3532>Local CMS</h1><button class="p-2 -mr-2 text-muted-foreground hover:text-foreground" data-v-c34d3532>`);
      if (!unref(isSidebarOpen)) {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c34d3532><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-v-c34d3532></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c34d3532><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-c34d3532></path></svg>`);
      }
      _push(`</button></div><div class="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-140 backdrop-blur-sm transition-opacity duration-300" style="${ssrRenderStyle(unref(isSidebarOpen) ? null : { display: "none" })}" data-v-c34d3532></div><aside class="${ssrRenderClass([
        "fixed left-0 top-0 h-full w-64 border-r border-border bg-component dark:bg-black/90 p-6 flex flex-col gap-8 backdrop-blur-xl z-150 transition-transform duration-300 lg:translate-x-0",
        unref(isSidebarOpen) ? "translate-x-0" : "-translate-x-full"
      ])}" data-v-c34d3532><h1 class="hidden lg:block text-2xl font-bold tracking-tight text-foreground" data-v-c34d3532>Local CMS</h1><nav class="flex flex-col gap-2 pt-20 lg:pt-0" data-v-c34d3532><button class="${ssrRenderClass([unref(activeTab) === "notes" ? "bg-foreground text-background font-medium shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground", "px-4 py-2 rounded-lg text-left transition-all duration-200"])}" data-v-c34d3532> Notes </button><button class="${ssrRenderClass([unref(activeTab) === "projects" ? "bg-foreground text-background font-medium shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground", "px-4 py-2 rounded-lg text-left transition-all duration-200"])}" data-v-c34d3532> Projects </button></nav><div class="mt-auto" data-v-c34d3532>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532${_scopeId}><path d="M15 18l-6-6 6-6" data-v-c34d3532${_scopeId}></path></svg> Back to Website `);
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
      _push(`</div></aside><main class="${ssrRenderClass(["lg:ml-64 p-6 lg:p-12 max-w-full lg:max-w-5xl transition-all pt-24 lg:pt-12"])}" data-v-c34d3532>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center py-20" data-v-c34d3532><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" data-v-c34d3532></div></div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(view) === "list") {
          _push(`<div class="flex flex-col gap-8" data-v-c34d3532><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4" data-v-c34d3532><h2 class="text-2xl lg:text-3xl font-medium tracking-tight text-foreground" data-v-c34d3532>${ssrInterpolate(unref(cmsHeaderTitle))}</h2><button class="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 active:scale-95" data-v-c34d3532><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532><line x1="12" y1="5" x2="12" y2="19" data-v-c34d3532></line><line x1="5" y1="12" x2="19" data-v-c34d3532></line></svg> New ${ssrInterpolate(unref(activeTabLabel))}</button></div><div class="flex flex-col gap-4" data-v-c34d3532><!--[-->`);
          ssrRenderList(unref(activeItems), (item) => {
            _push(`<div class="p-5 rounded-2xl border border-border bg-component/50 dark:bg-white/2 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group" data-v-c34d3532><div class="flex flex-col gap-1.5" data-v-c34d3532><h3 class="font-bold text-base lg:text-lg text-foreground group-hover:text-blue-500 transition-colors leading-tight" data-v-c34d3532>${ssrInterpolate(item.title)}</h3><div class="flex items-center gap-2 text-xs font-medium text-muted-foreground" data-v-c34d3532><span class="px-2 py-0.5 bg-muted rounded uppercase tracking-wider" data-v-c34d3532>${ssrInterpolate(item.year)}</span><span class="opacity-40" data-v-c34d3532>•</span><span class="font-mono" data-v-c34d3532>${ssrInterpolate(item.slug)}</span></div></div><div class="flex items-center gap-3" data-v-c34d3532><button class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-foreground hover:text-background transition-all" data-v-c34d3532> Edit </button><button class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" data-v-c34d3532> Delete </button></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(activeItems).length === 0) {
            _push(`<div class="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border" data-v-c34d3532><p class="text-muted-foreground font-medium" data-v-c34d3532>No items found in ${ssrInterpolate(unref(activeTab))}.</p><button class="mt-4 text-blue-500 font-bold hover:underline" data-v-c34d3532>Create your first now</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<div class="flex flex-col gap-8" data-v-c34d3532><div class="flex items-center gap-4 mb-4" data-v-c34d3532><button class="p-2 bg-muted hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground" data-v-c34d3532><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-c34d3532><path d="M19 12H5" data-v-c34d3532></path><path d="M12 19l-7-7 7-7" data-v-c34d3532></path></svg></button><h2 class="text-xl lg:text-2xl font-bold text-foreground" data-v-c34d3532>${ssrInterpolate(unref(editHeaderTitle))}</h2></div><form class="flex flex-col gap-10 lg:max-w-5xl pb-32" data-v-c34d3532><section class="flex flex-col gap-8 bg-component/30 p-6 lg:p-8 rounded-3xl border border-border" data-v-c34d3532><div class="flex items-center gap-3" data-v-c34d3532><div class="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500" data-v-c34d3532><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c34d3532><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c34d3532></path></svg></div><h3 class="text-sm font-bold uppercase tracking-widest text-foreground/60" data-v-c34d3532>Basic Metadata</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-c34d3532><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Display Title</label><input${ssrRenderAttr("value", unref(formData).title)} type="text" required placeholder="Project Name" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-c34d3532></div><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Identifier (Slug)</label><input${ssrRenderAttr("value", unref(formData).slug)} type="text" required placeholder="project-slug" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono" data-v-c34d3532></div><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Short Subtitle</label><input${ssrRenderAttr("value", unref(formData).subtitle)} type="text" placeholder="Design System Architecture" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-c34d3532></div><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Publication Year</label><input${ssrRenderAttr("value", unref(formData).year)} type="text" placeholder="2024" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-c34d3532></div><div class="flex flex-col gap-3 lg:col-span-2" data-v-c34d3532><div class="flex justify-between items-center px-1" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Featured Image / Cover</label><button type="button"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400" data-v-c34d3532><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c34d3532><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" data-v-c34d3532></path></svg> ${ssrInterpolate(unref(isUploading) ? "Uploading..." : "Upload Image")}</button><input type="file" class="hidden" accept="image/*" data-v-c34d3532></div><input${ssrRenderAttr("value", unref(formData).coverImage)} type="text" placeholder="https://..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed" data-v-c34d3532><p class="text-[10px] text-muted-foreground px-1 font-medium italic" data-v-c34d3532>Max 5MB. Ideal ratio 16:9 for optimal accessibility.</p></div></div></section><section class="flex flex-col gap-8 bg-component/30 p-6 lg:p-8 rounded-3xl border border-border" data-v-c34d3532><div class="flex items-center gap-3" data-v-c34d3532><div class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500" data-v-c34d3532><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c34d3532><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c34d3532></path></svg></div><h3 class="text-sm font-bold uppercase tracking-widest text-foreground/60" data-v-c34d3532>Rich Content </h3></div>`);
          if (unref(activeTab) === "notes") {
            _push(`<div class="flex flex-col gap-8" data-v-c34d3532><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Excerpt (Card Preview)</label><textarea rows="2" placeholder="Brief summary of the note..." class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground leading-relaxed" data-v-c34d3532>${ssrInterpolate(unref(formData).excerpt)}</textarea></div><div class="flex flex-col gap-2.5" data-v-c34d3532><div class="flex justify-between items-center px-1" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-c34d3532>Body Text (Supports Markdown)</label><button type="button"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400" data-v-c34d3532><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c34d3532><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-c34d3532></path></svg> Insert Image </button><input type="file" class="hidden" accept="image/*" data-v-c34d3532></div><div class="min-h-[500px]" data-v-c34d3532>`);
            _push(ssrRenderComponent(_component_ContentBuilder, {
              modelValue: unref(formData).content,
              "onUpdate:modelValue": ($event) => unref(formData).content = $event
            }, null, _parent));
            _push(`</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(activeTab) === "projects") {
            _push(`<div class="flex flex-col gap-8" data-v-c34d3532><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-c34d3532><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Client Name</label><input${ssrRenderAttr("value", unref(formData).client)} type="text" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-c34d3532></div><div class="flex flex-col gap-2.5" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Your Role</label><input${ssrRenderAttr("value", unref(formData).role)} type="text" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium" data-v-c34d3532></div><div class="flex flex-col gap-2.5 col-span-1 lg:col-span-2" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1" data-v-c34d3532>Tags (Comma Separated)</label><input${ssrRenderAttr("value", unref(tagsInput))} type="text" placeholder="Design System, SaaS, React" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground" data-v-c34d3532></div></div><div class="flex flex-col gap-4" data-v-c34d3532><div class="flex justify-between items-end px-1" data-v-c34d3532><label class="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-v-c34d3532>Gallery Assets</label><button type="button"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="text-[11px] font-bold text-blue-500 uppercase bg-blue-500/10 px-4 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors" data-v-c34d3532>${ssrInterpolate(unref(isUploading) ? "..." : "Add to Gallery")}</button><input type="file" class="hidden" multiple accept="image/*" data-v-c34d3532></div><textarea rows="6" placeholder="https://image1.jpg
https://image2.jpg" class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed" data-v-c34d3532>${ssrInterpolate(unref(wireframesInput))}</textarea></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section><div class="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 dark:bg-black/90 backdrop-blur-xl border-t border-border p-5 lg:p-8 z-100 flex gap-4 lg:justify-end shadow-2xl transition-colors" data-v-c34d3532><button type="button" class="flex-1 lg:flex-none px-8 py-3.5 rounded-2xl border-2 border-border font-bold text-foreground hover:bg-muted active:scale-95 transition-all text-sm uppercase tracking-widest" data-v-c34d3532> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(isUploading)) ? " disabled" : ""} class="flex-2 lg:flex-none px-12 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-xl shadow-blue-500/20 text-sm uppercase tracking-widest disabled:opacity-50 active:scale-95" data-v-c34d3532>${ssrInterpolate(unref(isUploading) ? "Syncing..." : unref(isEditing) ? "Update Entry" : "Publish Entry")}</button></div></form></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</main>`);
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
const cms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c34d3532"]]);

export { cms as default };
//# sourceMappingURL=cms-DZQqeHmp.mjs.map
