import React, { JSX } from 'react';
import { Tree } from "@/components/Tree";
import { ITEMS_TO_CREATE } from "@/data/itemsToCreate";
import { useCreateResourceMutation } from "@/mutations/useCreateResourceMutation";
import { FileContainer } from "@/types/File";
import { ResourceKind, Resource } from "@/types/Resource";

import { useState } from 'react'

// Mock 🌲:
// const fileTree = {
//   'uploads': {
//     'documents': {
//       reports: {
//         annual: {},
//         quarterly: {
//           'report.xlsx': {}
//         }
//       }
//     },
//   }
// }

type TreeNode = {
  [key: string]: TreeNode
}

function getResourceKind(file: File): ResourceKind {
  const mime = file.type;

  if (mime.startsWith("image/")) return ResourceKind.Image
  if (mime.startsWith("video/")) return ResourceKind.Video
  if (mime.startsWith("audio/")) return ResourceKind.Other

  // TODO: add more mime types and ResourceKinds if needed
  if (
    mime === "application/pdf" ||
    mime === "application/msword" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    mime === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    mime === "text/plain" ||
    mime === "text/csv" ||
    mime === "text/markdown"
  ) {
    return ResourceKind.Other
  }
  // You can add more checks for folders if needed, e.g. by convention
  return ResourceKind.Other
}

function getParentId (path: string): string {
  const segments = path.split('/').filter(Boolean)
  return '/' + segments.slice(0, -1).join('/')
}

export default function Home() {
  const createResourceMutation = useCreateResourceMutation({
    onSuccess: (data: Response) => {
      data.json().then(json => {
        console.log('Resource created:', json)
      })
    },
    onError: (error) => {
      console.error('Failed to create resource:', error)
    }
  })
  const [forest, setForest] = useState({})

  const onClickPopulateItems = () => {
    const nextTree: TreeNode = {}

    ITEMS_TO_CREATE.forEach(item => {
      const pathSegments = item.path.split('/').slice(1)
      let prevPath: TreeNode = nextTree

      pathSegments.forEach(pathSegment => {
        if (!prevPath[pathSegment]) {
          prevPath[pathSegment] = {}
        }
        prevPath = prevPath[pathSegment]
      })
    })

    setForest(nextTree)
  }

  const onClickCreateItem = (item: FileContainer) => {
    const file = item.file

    const resourceInput = {
      name: file.name,
      mimeType: file.type,
      size: file.size,
      kind: getResourceKind(file),
      parentId: getParentId(item.path)
    }

    console.log('Creating resourse:', resourceInput)
    createResourceMutation.mutate(resourceInput)
  }

  const RenderTreeItems = (tree: TreeNode, depth: number): JSX.Element[] => {
    return Object.entries(tree).map((item, index) => {
      const name = item[0]
      const deeperTree = item[1]

      return (
        <div key={`${name}-${depth}-${index}`}>
          <Tree.Item depth={depth}>{name}</Tree.Item>
          {RenderTreeItems(deeperTree, depth + 1)}
        </div>
      )
    })
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 30,
      }}
    >
      <button onClick={onClickPopulateItems}>Visualize and Create items</button>
      <button onClick={() => onClickCreateItem(ITEMS_TO_CREATE[0])}>Create Item</button>

      {/**
       * tree visualization
       */}
      <Tree.Container>
        <Tree.Item depth={0}>Hello</Tree.Item>
        <Tree.Item depth={1}>world</Tree.Item>
        <Tree.Item depth={2}>tree</Tree.Item>
        <Tree.Item depth={3}>file2.mp4</Tree.Item>
        <Tree.Item depth={2}>file2.mp4</Tree.Item>
        <Tree.Item depth={1}>folder</Tree.Item>
        <Tree.Item depth={2}>file2.mp4</Tree.Item>

        {RenderTreeItems(forest, 0)}
      </Tree.Container>
    </div>
  )
}
