export const closeModalUpdateBoard = (className: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  let closeModal = true;

  if ((e.target as Element).className.includes(className)) {
    closeModal = false;
  }
  if (closeModal) {
    let i = 0;
    let parent = (e.target as Element).parentNode;
    const body = document.querySelector('body')
    while (parent !== body) {
      if ((parent as Element).className && (parent as Element).className.includes(className)) {
        closeModal = false;
      }
      parent = (parent as Element).parentNode;
      i++;
    }
  }
  return closeModal;
}