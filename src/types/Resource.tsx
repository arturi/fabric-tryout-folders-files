export enum ResourceKind {
  Image = "image",
  Video = "video",
  Other = "other",
  Folder = "folder",
}

export interface ResourceApiInput {
  name: string;
  mimeType: string;
  size: number;
  kind: ResourceKind;
  parentId: string | null;
}

export interface Resource {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  kind: ResourceKind;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
