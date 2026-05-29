const baseUrl = window.location.origin;
const resultArea = document.getElementById('resultArea');

const getTokenHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const showResult = async (response) => {
  const text = await response.text();
  try {
    resultArea.textContent = JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    resultArea.textContent = text;
  }
};

const postJson = async (path, body, auth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) Object.assign(headers, getTokenHeaders());
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  await showResult(response);
  return response;
};

const getJson = async (path, auth = false) => {
  const headers = {};
  if (auth) Object.assign(headers, getTokenHeaders());
  const response = await fetch(`${baseUrl}${path}`, { headers });
  await showResult(response);
  return response;
};

const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const refreshBtn = document.getElementById('refreshBtn');
const logoutBtn = document.getElementById('logoutBtn');
const uploadVideoBtn = document.getElementById('uploadVideoBtn');
const listVideosBtn = document.getElementById('listVideosBtn');
const getVideoBtn = document.getElementById('getVideoBtn');
const postCommentBtn = document.getElementById('postCommentBtn');
const listCommentsBtn = document.getElementById('listCommentsBtn');

registerBtn.addEventListener('click', async () => {
  const body = {
    fullName: document.getElementById('registerFullName').value,
    email: document.getElementById('registerEmail').value,
    username: document.getElementById('registerUsername').value,
    password: document.getElementById('registerPassword').value,
  };
  await postJson('/api/v1/auth/register', body);
});

loginBtn.addEventListener('click', async () => {
  const body = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value,
  };
  const response = await postJson('/api/v1/auth/login', body);
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
  }
});

refreshBtn.addEventListener('click', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    resultArea.textContent = 'No refresh token stored';
    return;
  }
  const response = await postJson('/api/v1/auth/refresh', { refreshToken });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
  }
});

logoutBtn.addEventListener('click', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  await postJson('/api/v1/auth/logout', { refreshToken });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

uploadVideoBtn.addEventListener('click', async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    resultArea.textContent = 'Please login first before uploading a video.';
    return;
  }

  const fileInput = document.getElementById('videoFile');
  const file = fileInput.files[0];
  if (!file) {
    resultArea.textContent = 'Please choose a video file.';
    return;
  }

  const formData = new FormData();
  formData.append('videoFile', file);
  formData.append('title', document.getElementById('videoTitle').value);
  formData.append('description', document.getElementById('videoDescription').value);
  formData.append('duration', document.getElementById('videoDuration').value);
  formData.append('thumbnail', document.getElementById('videoThumbnail').value);
  formData.append('isPublic', document.getElementById('videoVisibility').value);

  const response = await fetch(`${baseUrl}/api/v1/videos/upload`, {
    method: 'POST',
    headers: getTokenHeaders(),
    body: formData,
  });
  await showResult(response);
});

listVideosBtn.addEventListener('click', async () => {
  await getJson('/api/v1/videos');
});

getVideoBtn.addEventListener('click', async () => {
  const id = document.getElementById('videoIdInput').value;
  if (!id) {
    resultArea.textContent = 'Please enter a video ID.';
    return;
  }
  await getJson(`/api/v1/videos/${id}`);
});

postCommentBtn.addEventListener('click', async () => {
  const body = {
    videoId: document.getElementById('commentVideoId').value,
    text: document.getElementById('commentText').value,
  };
  await postJson('/api/v1/comments', body, true);
});

listCommentsBtn.addEventListener('click', async () => {
  const videoId = document.getElementById('commentVideoId').value;
  if (!videoId) {
    resultArea.textContent = 'Please enter a video ID to list comments.';
    return;
  }
  await getJson(`/api/v1/comments/video/${videoId}`);
});
