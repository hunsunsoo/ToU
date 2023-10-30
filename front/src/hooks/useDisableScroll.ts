export const useDisableScroll = () => {
  const disableScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const enableScroll = () => {
    document.body.style.overflow = ''
  }

  return {
    disableScroll,
    enableScroll,
  }
}
