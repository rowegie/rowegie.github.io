// Picks up src/assets/profile.{jpg,jpeg,png,webp,avif} if it exists, so the
// site still builds (without a photo) when there isn't one.
const photos = import.meta.glob<string>('../assets/profile.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

export const photoUrl: string | undefined = Object.values(photos)[0]
