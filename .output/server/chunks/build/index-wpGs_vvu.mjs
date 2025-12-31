import { _ as __nuxt_component_0 } from './nuxt-link-CD-o4OdI.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useProjects } from './useProjects-DMPxBFQ8.mjs';
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
import './useSupabaseClient-CkLFOMIR.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchProjects, projects } = useProjects();
    [__temp, __restore] = withAsyncContext(() => fetchProjects()), await __temp, __restore();
    const activeProject = ref(0);
    ref([]);
    useSeoMeta({
      title: "Projects - Lanre Segun",
      description: "Explore my latest design and development projects. Senior Product Designer bridging complex engineering and premium UI.",
      ogTitle: "Projects - Lanre Segun",
      ogDescription: "Explore my latest design and development projects. Senior Product Designer bridging complex engineering and premium UI.",
      ogImage: "/og-image.png",
      ogUrl: "https://lanre-segun.vercel.app/projects",
      twitterTitle: "Projects - Lanre Segun",
      twitterDescription: "Explore my latest design and development projects. Senior Product Designer bridging complex engineering and premium UI.",
      twitterImage: "/og-image.png",
      twitterCard: "summary"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "h-screen w-full bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-none transition-colors duration-300",
        style: { "scroll-snap-type": "y mandatory" }
      }, _attrs))} data-v-e0c6cd53><main class="flex flex-col max-w-3xl mx-auto items-center pt-16 pb-12 px-8 gap-12" data-v-e0c6cd53><header class="w-full flex justify-between items-center pb-4 shrink-0 scroll-snap-align-start" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-e0c6cd53><h2 class="text-3xl font-medium tracking-tight" data-v-e0c6cd53>Projects</h2></header><!--[-->`);
      ssrRenderList(unref(projects), (project, index2) => {
        _push(`<div class="${ssrRenderClass([activeProject.value === index2 ? "opacity-100 scale-100" : "opacity-40 scale-90 grayscale-[0.5]", "project-item flex flex-col gap-6 w-full shrink-0 transition-all duration-700 ease-in-out"])}" style="${ssrRenderStyle({ "scroll-snap-align": "center", "min-height": "80vh", "justify-content": "center" })}" data-v-e0c6cd53>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/projects/${project.slug}`,
          class: "group relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 aspect-video block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", project.coverImage)}${ssrRenderAttr("alt", project.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-e0c6cd53${_scopeId}><div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" data-v-e0c6cd53${_scopeId}></div>`);
            } else {
              return [
                createVNode("img", {
                  src: project.coverImage,
                  alt: project.title,
                  class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="flex flex-col gap-3 px-2" data-v-e0c6cd53><div class="flex justify-between items-center" data-v-e0c6cd53><span class="text-sm font-mono text-blue-500 font-bold uppercase tracking-widest" data-v-e0c6cd53>${ssrInterpolate(project.year || "2024")}</span>`);
        if (project.featured) {
          _push(`<div class="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20 uppercase tracking-tighter" data-v-e0c6cd53> Featured</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><h3 class="text-4xl font-black tracking-tighter leading-none" data-v-e0c6cd53>${ssrInterpolate(project.title)}</h3>`);
        if (project.subtitle) {
          _push(`<p class="text-lg text-blue-400/80 font-medium italic -mt-1" data-v-e0c6cd53>${ssrInterpolate(project.subtitle)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-muted-foreground text-lg max-w-xl leading-relaxed mt-1" data-v-e0c6cd53>${ssrInterpolate(project.description)}</p><div class="flex flex-wrap gap-2 mt-1" data-v-e0c6cd53><!--[-->`);
        ssrRenderList(project.tags, (tag) => {
          _push(`<span class="text-[10px] text-neutral-500 uppercase tracking-widest border border-neutral-800 px-2 py-0.5 rounded" data-v-e0c6cd53>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/projects/${project.slug}`,
          class: "text-white bg-white/5 border border-white/10 px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-all w-fit mt-4 text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Case Study <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-e0c6cd53${_scopeId}><path d="M5 12h14" data-v-e0c6cd53${_scopeId}></path><path d="m12 5 7 7-7 7" data-v-e0c6cd53${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" View Case Study "),
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
                  createVNode("path", { d: "M5 12h14" }),
                  createVNode("path", { d: "m12 5 7 7-7 7" })
                ]))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--><footer class="h-[20vh] shrink-0" data-v-e0c6cd53></footer></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e0c6cd53"]]);

export { index as default };
//# sourceMappingURL=index-wpGs_vvu.mjs.map
