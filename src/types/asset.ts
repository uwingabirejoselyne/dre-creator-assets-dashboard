export type AssetType = 'image' | 'video' | 'audio' | 'document'

export type AssetStatus = 'active' | 'draft' | 'archived'

export interface Asset {
  id: string
  name: string
  type: AssetType
  status: AssetStatus
  size: number        // bytes
  createdAt: string   // ISO 8601
  updatedAt: string
  url: string
  description: string
  tags: string[]
}

export interface NewAssetPayload {
  name: string
  type: AssetType
  status: AssetStatus
  description: string
  tags: string[]
}
