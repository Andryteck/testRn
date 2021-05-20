export async function  FetchPosts() {
  const data: [] = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(response => response.json());
  return data;
}

export async function FetchPostData(id: number) {
  const postData: Response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.json());
  const userData: Response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.json());
  return {postData, userData};
}
