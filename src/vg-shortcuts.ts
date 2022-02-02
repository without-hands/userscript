const postsSelector = '#posts > li.postcontainer';
const posts: Element[] = [];

function onKeydown(event: KeyboardEvent) {
  if (event.isComposing || event.repeat || event.key == null) {
    return;
  }
  const target = event.target as Node;
  if (target != null && target.nodeType === 1 && /input|select|textarea/i.test(target.nodeName)) {
    return;
  }

  const key = event.key.toLowerCase();
  if (!event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
    if (key === 'd') {
      goToPreviousPost();
    } else if (key === 'f') {
      goToNextPost();
    }
  }
}

function goToPreviousPost() {
  const currentPost = getPostInFocus();
  const currentIndex = posts.indexOf(currentPost);
  const nextPost = posts[currentIndex - 1];
  if (!nextPost) {
    console.log('Start of page');
    return;
  }
  nextPost.scrollIntoView(true);
}

function goToNextPost() {
  const currentPost = getPostInFocus();
  const currentIndex = posts.indexOf(currentPost);
  const nextPost = posts[currentIndex + 1];
  if (!nextPost) {
    console.log('End of page');
    return;
  }
  nextPost.scrollIntoView(true);
}

function getPostInFocus(): Element {
  const visiblePosts = posts.filter(isInViewport);
  visiblePosts.sort((a, b) => {
    const rectA = a.getBoundingClientRect();
    const pctA =
      rectA.height / (Math.max(window.innerHeight, rectA.bottom) - Math.max(0, rectA.top));
    const rectB = b.getBoundingClientRect();
    const pctB =
      rectB.height / (Math.max(window.innerHeight, rectB.bottom) - Math.max(0, rectB.top));
    return pctA - pctB;
  });
  if (!visiblePosts[0]) {
    throw new Error('Unable to find current post');
  }
  return visiblePosts[0];
}

function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

document.addEventListener('keydown', onKeydown, true);
posts.push(...document.querySelectorAll(postsSelector));
posts.sort((a, b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y);
