export const SEARCH_PARAM = 'q'
export const TAGS_PARAM = 'tags'
export const LEGACY_TAG_PARAM = 'tag'

export const normalizeTags = (tags: string[]) =>
  Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b))

export const parseTagsFromParams = (params: URLSearchParams, validTags?: Set<string>) =>
  normalizeTags(
    [
      ...params
        .getAll(TAGS_PARAM)
        .flatMap((value) => value.split(',')),
      ...params.getAll(LEGACY_TAG_PARAM),
    ]
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && (!validTags || validTags.has(tag)))
  )

export const buildExperimentsListQuery = (params: URLSearchParams, validTags?: Set<string>) => {
  const nextParams = new URLSearchParams(params.toString())

  const query = nextParams.get(SEARCH_PARAM)?.trim()
  const tags = parseTagsFromParams(nextParams, validTags)

  nextParams.delete(SEARCH_PARAM)
  nextParams.delete(TAGS_PARAM)
  nextParams.delete(LEGACY_TAG_PARAM)

  if (query && query.length > 0) {
    nextParams.set(SEARCH_PARAM, query)
  }

  if (tags.length > 0) {
    nextParams.set(TAGS_PARAM, tags.join(','))
  }

  return nextParams.toString()
}

export const buildExperimentsBackHref = (queryString: string): string => {
  const params = new URLSearchParams(queryString)
  const query = buildExperimentsListQuery(params)
  return query.length > 0 ? `/experiments?${query}` : '/experiments'
}
