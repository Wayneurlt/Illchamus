const SITE_NAME = 'Illchamus Community CBO'

export function usePageMeta(title: string, description?: string) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} • ${SITE_NAME}`
  useHead({
    title: fullTitle,
    ...(description && {
      meta: [{ name: 'description', content: description }],
    }),
  })
}
