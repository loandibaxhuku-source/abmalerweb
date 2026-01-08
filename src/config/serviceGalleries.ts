// Service gallery configuration mapping services to their photo counts
export const serviceGalleries: Record<string, { folderName: string; photoCount: number }> = {
  maler: {
    folderName: 'maler',
    photoCount: 2,
  },
  fassadenbau: {
    folderName: 'fassadenbau',
    photoCount: 7,
  },
  renovationen: {
    folderName: 'renovationen',
    photoCount: 12,
  },
  trockenbau: {
    folderName: 'trockenbau',
    photoCount: 4,
  },
  gipsarbeiten: {
    folderName: 'gipsarbeiten',
    photoCount: 12,
  },
  bodenbelag: {
    folderName: 'bodenbelag',
    photoCount: 13,
  },
};
