import { _ as __nuxt_component_0 } from './nuxt-link-COIQhOYk.mjs';
import { defineComponent, useSSRContext, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useProjects } from './useProjects-BJGTM40K.mjs';
import { u as useHead } from './server.mjs';
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
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { getAllProjects } = useProjects();
    const projects = getAllProjects();
    const activeProject = ref(0);
    ref([]);
    useHead({
      title: "Projects - Lanre Segun",
      meta: [
        { name: "description", content: "Explore my latest design and development projects." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "h-screen w-full bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-none transition-colors duration-300",
        style: { "scroll-snap-type": "y mandatory" }
      }, _attrs))} data-v-5704e6b4><main class="flex flex-col max-w-3xl mx-auto items-center pt-16 pb-12 px-8 gap-12" data-v-5704e6b4><header class="w-full flex justify-between items-center pb-4 flex-shrink-0 scroll-snap-align-start" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-5704e6b4><h2 class="text-3xl font-medium tracking-tight" data-v-5704e6b4>Projects</h2></header><!--[-->`);
      ssrRenderList(unref(projects), (project, index2) => {
        _push(`<div class="${ssrRenderClass([activeProject.value === index2 ? "opacity-100 scale-100" : "opacity-40 scale-90 grayscale-[0.5]", "project-item flex flex-col gap-6 w-full flex-shrink-0 transition-all duration-700 ease-in-out"])}" style="${ssrRenderStyle({ "scroll-snap-align": "center", "min-height": "80vh", "justify-content": "center" })}" data-v-5704e6b4>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/projects/${project.slug}`,
          class: "group relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 aspect-video block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", project.coverImage)}${ssrRenderAttr("alt", project.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-5704e6b4${_scopeId}><div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" data-v-5704e6b4${_scopeId}></div>`);
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
        _push(`<div class="flex flex-col gap-3 px-2" data-v-5704e6b4><h3 class="text-2xl font-semibold tracking-tight" data-v-5704e6b4>${ssrInterpolate(project.title)}</h3><p class="text-muted-foreground text-lg max-w-xl leading-relaxed" data-v-5704e6b4>${ssrInterpolate(project.description)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/projects/${project.slug}`,
          class: "text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all w-fit mt-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Project Details <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5704e6b4${_scopeId}><path d="M5 12h14" data-v-5704e6b4${_scopeId}></path><path d="m12 5 7 7-7 7" data-v-5704e6b4${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" View Project Details "),
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "20",
                  height: "20",
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
      _push(`<!--]--><footer class="h-[20vh] flex-shrink-0" data-v-5704e6b4></footer></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5704e6b4"]]);

export { index as default };
//# sourceMappingURL=index-BL-dJM6c.mjs.map
