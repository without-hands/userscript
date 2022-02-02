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
  const documentElement = document.documentElement;
  const scrollPercentage =
    window.scrollY / (documentElement.scrollHeight - documentElement.clientHeight);
  if (Math.abs(1 - scrollPercentage) < 0.001) {
    console.log('End of page');
    return;
  }

  const currentPost = getPostInFocus();
  const currentIndex = posts.indexOf(currentPost);
  const nextPost = posts[currentIndex + 1];
  // if (!nextPost || isInsideViewport(posts[posts.length - 1])) {
  if (!nextPost) {
    console.log('End of page');
    return;
  }
  nextPost.scrollIntoView(true);
}

function getPostInFocus(): Element {
  const visiblePosts = posts.filter(intersectsViewport);
  visiblePosts.sort((a, b) => {
    const rectA = a.getBoundingClientRect();
    const pctA =
      rectA.height / (Math.min(window.innerHeight, rectA.bottom) - Math.max(0, rectA.top));
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

function intersectsViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function isInsideViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top > 0 && rect.bottom < window.innerHeight;
}

document.addEventListener('keydown', onKeydown, true);
posts.push(...document.querySelectorAll(postsSelector));
posts.sort((a, b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y);
