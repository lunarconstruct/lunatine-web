import { ComponentChildren } from "preact"
import { htmlToJsx } from "../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export interface CharacterDetailsOptions {
  // Relative path from the current page to the file to load
  // e.g., "bio" for a character page would load "CHARACTERS/Esela/bio.md"
  relatedFilePath?: string
}

const CharacterDetails: QuartzComponent = (
  { fileData, allFiles }: QuartzComponentProps,
  opts?: CharacterDetailsOptions,
) => {
  // If a related file path is specified, try to find and load it
  if (opts?.relatedFilePath) {
    // Build the target path based on the current page's slug
    const currentDir = fileData.slug!.split("/").slice(0, -1).join("/")
    const targetSlug = currentDir ? `${currentDir}/${opts.relatedFilePath}` : opts.relatedFilePath

    // Find the file in allFiles
    const relatedFile = allFiles.find((f) => f.slug === targetSlug)
    if (relatedFile && relatedFile.htmlAst) {
      const content = htmlToJsx(relatedFile.filePath!, relatedFile.htmlAst) as ComponentChildren
      const classes: string[] = relatedFile.frontmatter?.cssclasses ?? []
      const classString = ["popover-hint", ...classes].join(" ")
      return <article class={classString}>{content}</article>
    }
    // If the file wasn't found, return nothing
    return null
  }

  // If no relatedFilePath specified, return nothing (for sidebar use)
  return null
}

export default ((opts?: CharacterDetailsOptions) => {
  return (props: QuartzComponentProps) => CharacterDetails(props, opts)
}) satisfies QuartzComponentConstructor
