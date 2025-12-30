import { defineComponent, ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SecuritySetup",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const isOpen = ref(false);
    const answers = ref(["", "", ""]);
    const error = ref("");
    const loading = ref(false);
    const questionOptions = [
      "In what city or town did your parents meet?",
      "What was the name of the first company you worked for?",
      "What is the middle name of your youngest sibling"
    ];
    const open = () => {
      isOpen.value = true;
      answers.value = ["", "", ""];
      error.value = "";
    };
    const close = () => {
      isOpen.value = false;
    };
    __expose({ open, close });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isOpen)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm" }, _attrs))} data-v-2e9fb4d6><div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto" data-v-2e9fb4d6><h2 class="text-xl font-bold text-white mb-2" data-v-2e9fb4d6>Security Setup Required</h2><p class="text-neutral-400 text-sm mb-6" data-v-2e9fb4d6>Set up security questions to recover your password if you forget it.</p><form class="flex flex-col gap-6" data-v-2e9fb4d6><div class="flex flex-col gap-2" data-v-2e9fb4d6><label class="text-xs font-bold uppercase text-neutral-500" data-v-2e9fb4d6>${ssrInterpolate(questionOptions[0])}</label><input${ssrRenderAttr("value", unref(answers)[0])} type="text" placeholder="Your answer" required autocomplete="off" class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" data-v-2e9fb4d6></div><div class="flex flex-col gap-2" data-v-2e9fb4d6><label class="text-xs font-bold uppercase text-neutral-500" data-v-2e9fb4d6>${ssrInterpolate(questionOptions[1])}</label><input${ssrRenderAttr("value", unref(answers)[1])} type="text" placeholder="Your answer" required autocomplete="off" class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" data-v-2e9fb4d6></div><div class="flex flex-col gap-2" data-v-2e9fb4d6><label class="text-xs font-bold uppercase text-neutral-500" data-v-2e9fb4d6>${ssrInterpolate(questionOptions[2])}</label><input${ssrRenderAttr("value", unref(answers)[2])} type="text" placeholder="Your answer" required autocomplete="off" class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" data-v-2e9fb4d6></div><button type="submit" class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-2e9fb4d6>${ssrInterpolate(unref(loading) ? "Saving..." : "Save Security Questions")}</button></form>`);
        if (unref(error)) {
          _push(`<p class="text-red-500 text-sm mt-4 text-center" data-v-2e9fb4d6>${ssrInterpolate(unref(error))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SecuritySetup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SecuritySetup = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-2e9fb4d6"]]), { __name: "SecuritySetup" });

export { SecuritySetup as default };
//# sourceMappingURL=SecuritySetup-_uqyw_82.mjs.map
