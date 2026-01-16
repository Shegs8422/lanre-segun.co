
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


export const LoginModal: typeof import("../components/auth/LoginModal.vue").default
export const PasswordRecovery: typeof import("../components/auth/PasswordRecovery.vue").default
export const SecuritySetup: typeof import("../components/auth/SecuritySetup.vue").default
export const EducationCard: typeof import("../components/cards/EducationCard.vue").default
export const ProfileCard: typeof import("../components/cards/ProfileCard.vue").default
export const ContentBuilder: typeof import("../components/cms/ContentBuilder.vue").default
export const ProjectSectionBuilder: typeof import("../components/cms/ProjectSectionBuilder.vue").default
export const FloatingDock: typeof import("../components/layout/FloatingDock.vue").default
export const ExperienceTimeline: typeof import("../components/sections/ExperienceTimeline.vue").default
export const BookLoader: typeof import("../components/ui/BookLoader.vue").default
export const PolaroidPhoto: typeof import("../components/ui/PolaroidPhoto.vue").default
export const StatusBadge: typeof import("../components/ui/StatusBadge.vue").default
export const AnimatedLogo: typeof import("../components/widgets/AnimatedLogo.vue").default
export const Book3D: typeof import("../components/widgets/Book3D.vue").default
export const ChessPoster: typeof import("../components/widgets/ChessPoster.vue").default
export const DraggableCanvas: typeof import("../components/widgets/DraggableCanvas.vue").default
export const DraggableWidget: typeof import("../components/widgets/DraggableWidget.vue").default
export const DrawingCanvas: typeof import("../components/widgets/DrawingCanvas.vue").default
export const FlipClock: typeof import("../components/widgets/FlipClock.vue").default
export const LocationStamp: typeof import("../components/widgets/LocationStamp.vue").default
export const VinylRecord: typeof import("../components/widgets/VinylRecord.vue").default
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only").default
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only").default
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default
export const TresCanvas: typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue").default
export const TresCanvas: typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue").default
export const SchemaOrgDebug: typeof import("@unhead/schema-org/vue").SchemaOrgDebug
export const SchemaOrgArticle: typeof import("@unhead/schema-org/vue").SchemaOrgArticle
export const SchemaOrgBreadcrumb: typeof import("@unhead/schema-org/vue").SchemaOrgBreadcrumb
export const SchemaOrgComment: typeof import("@unhead/schema-org/vue").SchemaOrgComment
export const SchemaOrgEvent: typeof import("@unhead/schema-org/vue").SchemaOrgEvent
export const SchemaOrgFoodEstablishment: typeof import("@unhead/schema-org/vue").SchemaOrgFoodEstablishment
export const SchemaOrgHowTo: typeof import("@unhead/schema-org/vue").SchemaOrgHowTo
export const SchemaOrgImage: typeof import("@unhead/schema-org/vue").SchemaOrgImage
export const SchemaOrgJobPosting: typeof import("@unhead/schema-org/vue").SchemaOrgJobPosting
export const SchemaOrgLocalBusiness: typeof import("@unhead/schema-org/vue").SchemaOrgLocalBusiness
export const SchemaOrgOrganization: typeof import("@unhead/schema-org/vue").SchemaOrgOrganization
export const SchemaOrgPerson: typeof import("@unhead/schema-org/vue").SchemaOrgPerson
export const SchemaOrgProduct: typeof import("@unhead/schema-org/vue").SchemaOrgProduct
export const SchemaOrgQuestion: typeof import("@unhead/schema-org/vue").SchemaOrgQuestion
export const SchemaOrgRecipe: typeof import("@unhead/schema-org/vue").SchemaOrgRecipe
export const SchemaOrgReview: typeof import("@unhead/schema-org/vue").SchemaOrgReview
export const SchemaOrgVideo: typeof import("@unhead/schema-org/vue").SchemaOrgVideo
export const SchemaOrgWebPage: typeof import("@unhead/schema-org/vue").SchemaOrgWebPage
export const SchemaOrgWebSite: typeof import("@unhead/schema-org/vue").SchemaOrgWebSite
export const SchemaOrgMovie: typeof import("@unhead/schema-org/vue").SchemaOrgMovie
export const SchemaOrgCourse: typeof import("@unhead/schema-org/vue").SchemaOrgCourse
export const SchemaOrgItemList: typeof import("@unhead/schema-org/vue").SchemaOrgItemList
export const SchemaOrgBook: typeof import("@unhead/schema-org/vue").SchemaOrgBook
export const SchemaOrgSoftwareApp: typeof import("@unhead/schema-org/vue").SchemaOrgSoftwareApp
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page").default
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components").Link
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components").Base
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components").Title
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components").Style
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components").Head
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components").Html
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components").Body
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default
export const LazyLoginModal: LazyComponent<typeof import("../components/auth/LoginModal.vue").default>
export const LazyPasswordRecovery: LazyComponent<typeof import("../components/auth/PasswordRecovery.vue").default>
export const LazySecuritySetup: LazyComponent<typeof import("../components/auth/SecuritySetup.vue").default>
export const LazyEducationCard: LazyComponent<typeof import("../components/cards/EducationCard.vue").default>
export const LazyProfileCard: LazyComponent<typeof import("../components/cards/ProfileCard.vue").default>
export const LazyContentBuilder: LazyComponent<typeof import("../components/cms/ContentBuilder.vue").default>
export const LazyProjectSectionBuilder: LazyComponent<typeof import("../components/cms/ProjectSectionBuilder.vue").default>
export const LazyFloatingDock: LazyComponent<typeof import("../components/layout/FloatingDock.vue").default>
export const LazyExperienceTimeline: LazyComponent<typeof import("../components/sections/ExperienceTimeline.vue").default>
export const LazyBookLoader: LazyComponent<typeof import("../components/ui/BookLoader.vue").default>
export const LazyPolaroidPhoto: LazyComponent<typeof import("../components/ui/PolaroidPhoto.vue").default>
export const LazyStatusBadge: LazyComponent<typeof import("../components/ui/StatusBadge.vue").default>
export const LazyAnimatedLogo: LazyComponent<typeof import("../components/widgets/AnimatedLogo.vue").default>
export const LazyBook3D: LazyComponent<typeof import("../components/widgets/Book3D.vue").default>
export const LazyChessPoster: LazyComponent<typeof import("../components/widgets/ChessPoster.vue").default>
export const LazyDraggableCanvas: LazyComponent<typeof import("../components/widgets/DraggableCanvas.vue").default>
export const LazyDraggableWidget: LazyComponent<typeof import("../components/widgets/DraggableWidget.vue").default>
export const LazyDrawingCanvas: LazyComponent<typeof import("../components/widgets/DrawingCanvas.vue").default>
export const LazyFlipClock: LazyComponent<typeof import("../components/widgets/FlipClock.vue").default>
export const LazyLocationStamp: LazyComponent<typeof import("../components/widgets/LocationStamp.vue").default>
export const LazyVinylRecord: LazyComponent<typeof import("../components/widgets/VinylRecord.vue").default>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only").default>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only").default>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue").default>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue").default>
export const LazyTresCanvas: LazyComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue").default>
export const LazyTresCanvas: LazyComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue").default>
export const LazySchemaOrgDebug: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgDebug>
export const LazySchemaOrgArticle: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgArticle>
export const LazySchemaOrgBreadcrumb: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgBreadcrumb>
export const LazySchemaOrgComment: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgComment>
export const LazySchemaOrgEvent: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgEvent>
export const LazySchemaOrgFoodEstablishment: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgFoodEstablishment>
export const LazySchemaOrgHowTo: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgHowTo>
export const LazySchemaOrgImage: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgImage>
export const LazySchemaOrgJobPosting: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgJobPosting>
export const LazySchemaOrgLocalBusiness: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgLocalBusiness>
export const LazySchemaOrgOrganization: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgOrganization>
export const LazySchemaOrgPerson: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgPerson>
export const LazySchemaOrgProduct: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgProduct>
export const LazySchemaOrgQuestion: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgQuestion>
export const LazySchemaOrgRecipe: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgRecipe>
export const LazySchemaOrgReview: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgReview>
export const LazySchemaOrgVideo: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgVideo>
export const LazySchemaOrgWebPage: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgWebPage>
export const LazySchemaOrgWebSite: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgWebSite>
export const LazySchemaOrgMovie: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgMovie>
export const LazySchemaOrgCourse: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgCourse>
export const LazySchemaOrgItemList: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgItemList>
export const LazySchemaOrgBook: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgBook>
export const LazySchemaOrgSoftwareApp: LazyComponent<typeof import("@unhead/schema-org/vue").SchemaOrgSoftwareApp>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page").default>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Link>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Base>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Title>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Style>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Head>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Html>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Body>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default>

export const componentNames: string[]
