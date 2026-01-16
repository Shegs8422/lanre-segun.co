
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'LoginModal': typeof import("../../components/auth/LoginModal.vue").default
  'PasswordRecovery': typeof import("../../components/auth/PasswordRecovery.vue").default
  'SecuritySetup': typeof import("../../components/auth/SecuritySetup.vue").default
  'EducationCard': typeof import("../../components/cards/EducationCard.vue").default
  'ProfileCard': typeof import("../../components/cards/ProfileCard.vue").default
  'ContentBuilder': typeof import("../../components/cms/ContentBuilder.vue").default
  'ProjectSectionBuilder': typeof import("../../components/cms/ProjectSectionBuilder.vue").default
  'FloatingDock': typeof import("../../components/layout/FloatingDock.vue").default
  'ExperienceTimeline': typeof import("../../components/sections/ExperienceTimeline.vue").default
  'BookLoader': typeof import("../../components/ui/BookLoader.vue").default
  'PolaroidPhoto': typeof import("../../components/ui/PolaroidPhoto.vue").default
  'StatusBadge': typeof import("../../components/ui/StatusBadge.vue").default
  'AnimatedLogo': typeof import("../../components/widgets/AnimatedLogo.vue").default
  'Book3D': typeof import("../../components/widgets/Book3D.vue").default
  'ChessPoster': typeof import("../../components/widgets/ChessPoster.vue").default
  'DraggableCanvas': typeof import("../../components/widgets/DraggableCanvas.vue").default
  'DraggableWidget': typeof import("../../components/widgets/DraggableWidget.vue").default
  'DrawingCanvas': typeof import("../../components/widgets/DrawingCanvas.vue").default
  'FlipClock': typeof import("../../components/widgets/FlipClock.vue").default
  'LocationStamp': typeof import("../../components/widgets/LocationStamp.vue").default
  'VinylRecord': typeof import("../../components/widgets/VinylRecord.vue").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtImg': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default
  'NuxtPicture': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default
  'TresCanvas': typeof import("../../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue").default
  'TresCanvas': typeof import("../../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue").default
  'SchemaOrgDebug': typeof import("@unhead/schema-org/vue").SchemaOrgDebug
  'SchemaOrgArticle': typeof import("@unhead/schema-org/vue").SchemaOrgArticle
  'SchemaOrgBreadcrumb': typeof import("@unhead/schema-org/vue").SchemaOrgBreadcrumb
  'SchemaOrgComment': typeof import("@unhead/schema-org/vue").SchemaOrgComment
  'SchemaOrgEvent': typeof import("@unhead/schema-org/vue").SchemaOrgEvent
  'SchemaOrgFoodEstablishment': typeof import("@unhead/schema-org/vue").SchemaOrgFoodEstablishment
  'SchemaOrgHowTo': typeof import("@unhead/schema-org/vue").SchemaOrgHowTo
  'SchemaOrgImage': typeof import("@unhead/schema-org/vue").SchemaOrgImage
  'SchemaOrgJobPosting': typeof import("@unhead/schema-org/vue").SchemaOrgJobPosting
  'SchemaOrgLocalBusiness': typeof import("@unhead/schema-org/vue").SchemaOrgLocalBusiness
  'SchemaOrgOrganization': typeof import("@unhead/schema-org/vue").SchemaOrgOrganization
  'SchemaOrgPerson': typeof import("@unhead/schema-org/vue").SchemaOrgPerson
  'SchemaOrgProduct': typeof import("@unhead/schema-org/vue").SchemaOrgProduct
  'SchemaOrgQuestion': typeof import("@unhead/schema-org/vue").SchemaOrgQuestion
  'SchemaOrgRecipe': typeof import("@unhead/schema-org/vue").SchemaOrgRecipe
  'SchemaOrgReview': typeof import("@unhead/schema-org/vue").SchemaOrgReview
  'SchemaOrgVideo': typeof import("@unhead/schema-org/vue").SchemaOrgVideo
  'SchemaOrgWebPage': typeof import("@unhead/schema-org/vue").SchemaOrgWebPage
  'SchemaOrgWebSite': typeof import("@unhead/schema-org/vue").SchemaOrgWebSite
  'SchemaOrgMovie': typeof import("@unhead/schema-org/vue").SchemaOrgMovie
  'SchemaOrgCourse': typeof import("@unhead/schema-org/vue").SchemaOrgCourse
  'SchemaOrgItemList': typeof import("@unhead/schema-org/vue").SchemaOrgItemList
  'SchemaOrgBook': typeof import("@unhead/schema-org/vue").SchemaOrgBook
  'SchemaOrgSoftwareApp': typeof import("@unhead/schema-org/vue").SchemaOrgSoftwareApp
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyLoginModal': LazyComponent<typeof import("../../components/auth/LoginModal.vue").default>
  'LazyPasswordRecovery': LazyComponent<typeof import("../../components/auth/PasswordRecovery.vue").default>
  'LazySecuritySetup': LazyComponent<typeof import("../../components/auth/SecuritySetup.vue").default>
  'LazyEducationCard': LazyComponent<typeof import("../../components/cards/EducationCard.vue").default>
  'LazyProfileCard': LazyComponent<typeof import("../../components/cards/ProfileCard.vue").default>
  'LazyContentBuilder': LazyComponent<typeof import("../../components/cms/ContentBuilder.vue").default>
  'LazyProjectSectionBuilder': LazyComponent<typeof import("../../components/cms/ProjectSectionBuilder.vue").default>
  'LazyFloatingDock': LazyComponent<typeof import("../../components/layout/FloatingDock.vue").default>
  'LazyExperienceTimeline': LazyComponent<typeof import("../../components/sections/ExperienceTimeline.vue").default>
  'LazyBookLoader': LazyComponent<typeof import("../../components/ui/BookLoader.vue").default>
  'LazyPolaroidPhoto': LazyComponent<typeof import("../../components/ui/PolaroidPhoto.vue").default>
  'LazyStatusBadge': LazyComponent<typeof import("../../components/ui/StatusBadge.vue").default>
  'LazyAnimatedLogo': LazyComponent<typeof import("../../components/widgets/AnimatedLogo.vue").default>
  'LazyBook3D': LazyComponent<typeof import("../../components/widgets/Book3D.vue").default>
  'LazyChessPoster': LazyComponent<typeof import("../../components/widgets/ChessPoster.vue").default>
  'LazyDraggableCanvas': LazyComponent<typeof import("../../components/widgets/DraggableCanvas.vue").default>
  'LazyDraggableWidget': LazyComponent<typeof import("../../components/widgets/DraggableWidget.vue").default>
  'LazyDrawingCanvas': LazyComponent<typeof import("../../components/widgets/DrawingCanvas.vue").default>
  'LazyFlipClock': LazyComponent<typeof import("../../components/widgets/FlipClock.vue").default>
  'LazyLocationStamp': LazyComponent<typeof import("../../components/widgets/LocationStamp.vue").default>
  'LazyVinylRecord': LazyComponent<typeof import("../../components/widgets/VinylRecord.vue").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default>
  'LazyTresCanvas': LazyComponent<typeof import("../../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue").default>
  'LazyTresCanvas': LazyComponent<typeof import("../../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue").default>
  'LazySchemaOrgDebug': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgDebug>
  'LazySchemaOrgArticle': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgArticle>
  'LazySchemaOrgBreadcrumb': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgBreadcrumb>
  'LazySchemaOrgComment': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgComment>
  'LazySchemaOrgEvent': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgEvent>
  'LazySchemaOrgFoodEstablishment': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgFoodEstablishment>
  'LazySchemaOrgHowTo': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgHowTo>
  'LazySchemaOrgImage': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgImage>
  'LazySchemaOrgJobPosting': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgJobPosting>
  'LazySchemaOrgLocalBusiness': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgLocalBusiness>
  'LazySchemaOrgOrganization': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgOrganization>
  'LazySchemaOrgPerson': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgPerson>
  'LazySchemaOrgProduct': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgProduct>
  'LazySchemaOrgQuestion': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgQuestion>
  'LazySchemaOrgRecipe': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgRecipe>
  'LazySchemaOrgReview': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgReview>
  'LazySchemaOrgVideo': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgVideo>
  'LazySchemaOrgWebPage': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgWebPage>
  'LazySchemaOrgWebSite': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgWebSite>
  'LazySchemaOrgMovie': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgMovie>
  'LazySchemaOrgCourse': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgCourse>
  'LazySchemaOrgItemList': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgItemList>
  'LazySchemaOrgBook': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgBook>
  'LazySchemaOrgSoftwareApp': LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgSoftwareApp>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
