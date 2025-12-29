import { u as useHead, _ as __nuxt_component_0 } from './server.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
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
    useHead({
      title: "Lanre Segun - Senior Product Designer | Interactive Portfolio",
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
//# sourceMappingURL=index-p7rHz1Ro.mjs.map
