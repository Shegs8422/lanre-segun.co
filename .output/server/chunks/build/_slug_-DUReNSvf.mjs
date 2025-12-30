import { _ as __nuxt_component_0 } from './nuxt-link-CD-o4OdI.mjs';
import { defineComponent, withAsyncContext, computed, ref, watch, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { d as useRoute, b as useSeoMeta } from './server.mjs';
import { u as useProjects } from './useProjects-BdW4_BiV.mjs';
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
import './useSupabaseClient-CkLFOMIR.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { getProjectBySlug, getAdjacentProjects, fetchProjects } = useProjects();
    [__temp, __restore] = withAsyncContext(() => fetchProjects()), await __temp, __restore();
    const project = computed(() => getProjectBySlug(route.params.slug));
    const adjacent = computed(() => getAdjacentProjects(route.params.slug));
    const showPrototype = ref(false);
    useSeoMeta({
      title: () => project.value ? `${project.value.title} - Lanre Segun` : "Project Not Found",
      description: () => project.value?.description || "Project details and case study.",
      ogTitle: () => project.value ? `${project.value.title} - Lanre Segun` : "Project Not Found",
      ogDescription: () => project.value?.description || "Project details and case study.",
      ogImage: () => project.value?.coverImage || "/og-image.png",
      ogUrl: () => `https://lanre-segun.vercel.app/projects/${project.value?.slug || ""}`,
      twitterTitle: () => project.value ? `${project.value.title} - Lanre Segun` : "Project Not Found",
      twitterDescription: () => project.value?.description || "Project details and case study.",
      twitterImage: () => project.value?.coverImage || "/og-image.png",
      twitterCard: "summary"
    });
    watch(() => route.params.slug, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50" data-v-24c10a3b>`);
      if (unref(project)) {
        _push(`<div class="max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24" data-v-24c10a3b><header class="flex flex-col gap-10 animate-fade-in-up" data-v-24c10a3b><div class="flex items-center justify-between" data-v-24c10a3b>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          class: "w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-24c10a3b${_scopeId}><path d="m15 18-6-6 6-6" data-v-24c10a3b${_scopeId}></path></svg> Back to Projects `);
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
                  createVNode("path", { d: "m15 18-6-6 6-6" })
                ])),
                createTextVNode(" Back to Projects ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(project).projectLink) {
          _push(`<button class="w-fit flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-bold text-white shadow-lg shadow-blue-500/20" data-v-24c10a3b>${ssrInterpolate(unref(project).isFigma ? "View Prototype" : "Go to Project")} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-24c10a3b><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-v-24c10a3b></path><polyline points="15 3 21 3 21 9" data-v-24c10a3b></polyline><line x1="10" y1="14" x2="21" y2="3" data-v-24c10a3b></line></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col gap-6" data-v-24c10a3b><div class="flex flex-wrap gap-2" data-v-24c10a3b><!--[-->`);
        ssrRenderList(unref(project).tags, (tag) => {
          _push(`<span class="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20 uppercase tracking-widest" data-v-24c10a3b>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><h1 class="text-5xl md:text-7xl font-bold tracking-tighter leading-tight" data-v-24c10a3b>${ssrInterpolate(unref(project).title)}</h1><p class="text-muted-foreground text-xl md:text-2xl font-light max-w-2xl leading-relaxed" data-v-24c10a3b>${ssrInterpolate(unref(project).subtitle || unref(project).description)}</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 mt-4" data-v-24c10a3b><div class="flex flex-col gap-1" data-v-24c10a3b><span class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold" data-v-24c10a3b>Client</span><span class="text-sm font-medium" data-v-24c10a3b>${ssrInterpolate(unref(project).client || "N/A")}</span></div><div class="flex flex-col gap-1" data-v-24c10a3b><span class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold" data-v-24c10a3b>Role</span><span class="text-sm font-medium" data-v-24c10a3b>${ssrInterpolate(unref(project).role || "N/A")}</span></div><div class="flex flex-col gap-1" data-v-24c10a3b><span class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold" data-v-24c10a3b>Industry</span><span class="text-sm font-medium" data-v-24c10a3b>${ssrInterpolate(unref(project).industry || "N/A")}</span></div><div class="flex flex-col gap-1" data-v-24c10a3b><span class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold" data-v-24c10a3b>Duration</span><span class="text-sm font-medium" data-v-24c10a3b>${ssrInterpolate(unref(project).duration || "N/A")}</span></div></div></header><div class="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up delay-100 bg-white/5 relative group" data-v-24c10a3b>`);
        if (unref(project).coverImage || unref(project).content.heroImage) {
          _push(`<img${ssrRenderAttr("src", unref(project).coverImage || unref(project).content.heroImage)}${ssrRenderAttr("alt", unref(project).title)} class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" data-v-24c10a3b>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-24c10a3b></div></div><section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 animate-fade-in-up delay-200" data-v-24c10a3b><div class="md:col-span-4 flex flex-col gap-4" data-v-24c10a3b><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-24c10a3b>01. Context</h3><h2 class="text-3xl font-bold tracking-tight" data-v-24c10a3b>The Challenge</h2></div><div class="md:col-span-8 flex flex-col gap-12" data-v-24c10a3b><p class="text-xl leading-relaxed text-foreground/90 font-light italic border-l-2 border-blue-500 pl-8 py-2" data-v-24c10a3b> &quot;${ssrInterpolate(unref(project).problemStatement || unref(project).description)}&quot; </p><div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-24c10a3b><div class="flex flex-col gap-4" data-v-24c10a3b><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-24c10a3b>Business Goal</h4><p class="text-muted-foreground leading-relaxed" data-v-24c10a3b>${ssrInterpolate(unref(project).businessGoal || `Defining key
                                business objectives for the project revival.`)}</p></div><div class="flex flex-col gap-4" data-v-24c10a3b><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-24c10a3b>User Goal</h4><p class="text-muted-foreground leading-relaxed" data-v-24c10a3b>${ssrInterpolate(unref(project).userGoal || `Prioritizing user
                                needs and friction-less experiences.`)}</p></div></div></div></section><section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 animate-fade-in-up" data-v-24c10a3b><div class="md:col-span-4 flex flex-col gap-4" data-v-24c10a3b><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-24c10a3b>02. Execution</h3><h2 class="text-3xl font-bold tracking-tight" data-v-24c10a3b>Design Approach</h2></div><div class="md:col-span-8 flex flex-col gap-12" data-v-24c10a3b><p class="text-lg leading-relaxed text-muted-foreground" data-v-24c10a3b>${ssrInterpolate(unref(project).designApproach || unref(project).content.introduction)}</p><div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-8 rounded-2xl border border-white/10" data-v-24c10a3b><div class="flex flex-col gap-4" data-v-24c10a3b><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-24c10a3b>Methods</h4><p class="text-muted-foreground leading-relaxed" data-v-24c10a3b>${ssrInterpolate(unref(project).researchMethods || `User
                                Research, Audits, Benchmarking.`)}</p></div><div class="flex flex-col gap-4" data-v-24c10a3b><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-24c10a3b>Key Insights</h4><p class="text-muted-foreground leading-relaxed" data-v-24c10a3b>${ssrInterpolate(unref(project).keyInsights || `Identifying core
                                pain points in existing workflows.`)}</p></div></div></div></section>`);
        if (unref(project).wireframes?.length) {
          _push(`<section class="flex flex-col gap-10 animate-fade-in-up" data-v-24c10a3b><div class="flex flex-col gap-4" data-v-24c10a3b><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-24c10a3b>03. Iteration</h3><h2 class="text-3xl font-bold tracking-tight" data-v-24c10a3b>Wireframes &amp; Workflows</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-24c10a3b><!--[-->`);
          ssrRenderList(unref(project).wireframes, (img, i) => {
            _push(`<div class="rounded-2xl overflow-hidden bg-white/5 aspect-[16/10] border border-white/5" data-v-24c10a3b><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover" data-v-24c10a3b></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).finalDesigns?.length) {
          _push(`<section class="flex flex-col gap-10 animate-fade-in-up" data-v-24c10a3b><div class="flex flex-col gap-4" data-v-24c10a3b><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-24c10a3b>04. Visual System</h3><h2 class="text-3xl font-bold tracking-tight" data-v-24c10a3b>The Final Solution</h2></div><div class="flex flex-col gap-12" data-v-24c10a3b><!--[-->`);
          ssrRenderList(unref(project).finalDesigns, (img, i) => {
            _push(`<div class="rounded-3xl overflow-hidden bg-white/5 border border-white/10" data-v-24c10a3b><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover" data-v-24c10a3b></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).content.sections?.length) {
          _push(`<div class="flex flex-col gap-20 py-20 border-y border-white/5" data-v-24c10a3b><!--[-->`);
          ssrRenderList(unref(project).content.sections, (section, idx) => {
            _push(`<div class="flex flex-col gap-8" data-v-24c10a3b>`);
            if (section.type === "image") {
              _push(`<div class="w-full aspect-video rounded-2xl overflow-hidden bg-white/5 relative group" data-v-24c10a3b><img${ssrRenderAttr("src", section.image)} class="w-full h-full object-cover" data-v-24c10a3b>`);
              if (section.caption) {
                _push(`<p class="absolute bottom-4 left-4 text-xs font-medium text-white/50 bg-black/50 px-2 py-1 rounded backdrop-blur-md" data-v-24c10a3b>${ssrInterpolate(section.caption)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            if (section.type === "text") {
              _push(`<p class="text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto text-center" data-v-24c10a3b>${ssrInterpolate(section.content)}</p>`);
            } else {
              _push(`<!---->`);
            }
            if (section.type === "grid") {
              _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-24c10a3b><!--[-->`);
              ssrRenderList(section.images, (img, i) => {
                _push(`<div class="rounded-2xl overflow-hidden bg-white/5 aspect-[4/3]" data-v-24c10a3b><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover" data-v-24c10a3b></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 animate-fade-in-up" data-v-24c10a3b><div class="md:col-span-4 flex flex-col gap-4" data-v-24c10a3b><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-24c10a3b>05. Conclusion</h3><h2 class="text-3xl font-bold tracking-tight" data-v-24c10a3b>The Impact</h2></div><div class="md:col-span-8 flex flex-col gap-12" data-v-24c10a3b><p class="text-lg leading-relaxed text-muted-foreground" data-v-24c10a3b>${ssrInterpolate(unref(project).outcome || unref(project).content.results.description)}</p><div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-24c10a3b><div class="flex flex-col gap-4" data-v-24c10a3b><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-24c10a3b>Learnings</h4><p class="text-muted-foreground leading-relaxed" data-v-24c10a3b>${ssrInterpolate(unref(project).learnings || `Iterative testing
                                is key to solving complex UX problems.`)}</p></div><div class="flex flex-col gap-4" data-v-24c10a3b><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-24c10a3b>Tools Used</h4><div class="flex flex-wrap gap-2" data-v-24c10a3b><!--[-->`);
        ssrRenderList(unref(project).tools, (tool) => {
          _push(`<span class="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-muted-foreground border border-white/5" data-v-24c10a3b>${ssrInterpolate(tool)}</span>`);
        });
        _push(`<!--]--></div></div></div></div></section>`);
        if (unref(project).content.results.metrics?.length) {
          _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" data-v-24c10a3b><!--[-->`);
          ssrRenderList(unref(project).content.results.metrics, (metric, mIdx) => {
            _push(`<div class="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col gap-2 group hover:bg-white/10 transition-colors" data-v-24c10a3b><span class="text-xs text-muted-foreground font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors" data-v-24c10a3b>${ssrInterpolate(metric.label)}</span><span class="text-4xl font-bold text-white" data-v-24c10a3b>${ssrInterpolate(metric.value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<footer class="flex justify-between items-center py-12 border-t border-white/10 mt-12" data-v-24c10a3b>`);
        if (unref(adjacent).prev) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/projects/${unref(adjacent).prev.slug}`,
            class: "flex flex-col gap-1 group text-left max-w-[40%]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" data-v-24c10a3b${_scopeId}>Previous Project</span><span class="text-xl font-bold group-hover:-translate-x-2 transition-transform truncate" data-v-24c10a3b${_scopeId}>${ssrInterpolate(unref(adjacent).prev.title)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" }, "Previous Project"),
                  createVNode("span", { class: "text-xl font-bold group-hover:-translate-x-2 transition-transform truncate" }, toDisplayString(unref(adjacent).prev.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="w-1" data-v-24c10a3b></div>`);
        }
        if (unref(adjacent).next) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/projects/${unref(adjacent).next.slug}`,
            class: "flex flex-col gap-1 group text-right items-end max-w-[40%]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" data-v-24c10a3b${_scopeId}>Next Project</span><span class="text-xl font-bold group-hover:translate-x-2 transition-transform truncate" data-v-24c10a3b${_scopeId}>${ssrInterpolate(unref(adjacent).next.title)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" }, "Next Project"),
                  createVNode("span", { class: "text-xl font-bold group-hover:translate-x-2 transition-transform truncate" }, toDisplayString(unref(adjacent).next.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</footer></div>`);
      } else {
        _push(`<div class="h-screen flex items-center justify-center" data-v-24c10a3b><div class="flex flex-col items-center gap-4" data-v-24c10a3b><p class="text-muted-foreground" data-v-24c10a3b>Project not found</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          class: "text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Projects`);
            } else {
              return [
                createTextVNode("Back to Projects")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
      if (unref(showPrototype) && unref(project)?.projectLink) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12" data-v-24c10a3b><div class="absolute inset-0 bg-black/90 backdrop-blur-xl" data-v-24c10a3b></div><div class="relative w-full h-full max-w-7xl bg-[#1e1e1e] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl animate-modal-in" data-v-24c10a3b><div class="flex items-center justify-between p-6 border-b border-white/5 order-last md:order-first" data-v-24c10a3b><div class="flex flex-col" data-v-24c10a3b><h3 class="text-lg font-bold" data-v-24c10a3b>${ssrInterpolate(unref(project).title)} Prototype</h3><p class="text-xs text-muted-foreground" data-v-24c10a3b>Interactive Figma Preview</p></div><button class="p-3 hover:bg-white/5 rounded-full transition-colors" data-v-24c10a3b><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-24c10a3b><line x1="18" y1="6" x2="6" y2="18" data-v-24c10a3b></line><line x1="6" y1="6" x2="18" y2="18" data-v-24c10a3b></line></svg></button></div><div class="flex-1 w-full relative bg-black" data-v-24c10a3b><iframe${ssrRenderAttr("src", unref(project).projectLink)} class="absolute inset-0 w-full h-full border-0" allowfullscreen data-v-24c10a3b></iframe></div><button class="md:hidden absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white z-10" data-v-24c10a3b><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-24c10a3b><line x1="18" y1="6" x2="6" y2="18" data-v-24c10a3b></line><line x1="6" y1="6" x2="18" y2="18" data-v-24c10a3b></line></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24c10a3b"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-DUReNSvf.mjs.map
