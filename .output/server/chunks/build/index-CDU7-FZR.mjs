import { a as useSeoMeta, u as useHead, d as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, computed, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import '@supabase/ssr';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

publicAssetsURL("/images/image_4.png");
publicAssetsURL("/images/image_2.png");
publicAssetsURL("/images/image_6.png");
publicAssetsURL("/images/image_1.png");
publicAssetsURL("/images/image_12.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobile = ref(false);
    const bodyClass = computed(() => {
      return isMobile.value ? "bg-background" : "overflow-hidden bg-background";
    });
    useSeoMeta({
      title: "Lanre Segun - Senior Product Designer | Interactive Portfolio",
      description: "C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.",
      ogTitle: "Lanre Segun - Senior Product Designer | Interactive Portfolio",
      ogDescription: "C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.",
      ogImage: "/og-image.png",
      ogUrl: "https://lanre-segun.vercel.app",
      twitterTitle: "Lanre Segun - Senior Product Designer",
      twitterDescription: "Strategic Product Designer bridging complex engineering and premium UI.",
      twitterImage: "/og-image.png",
      twitterCard: "summary"
    });
    useHead({
      bodyAttrs: {
        class: bodyClass
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CDU7-FZR.mjs.map
