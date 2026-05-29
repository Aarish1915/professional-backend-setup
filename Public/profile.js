const baseUrl = window.location.origin;
const resultArea = document.getElementById('resultArea');
const profileArea = document.getElementById('profileArea');
const historyList = document.getElementById('historyList');

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

const renderHistory = (items) => {
  if (!items || items.length === 0) {
    historyList.innerHTML = '<p>No watch history available.</p>';
    return;
  }

  historyList.innerHTML = items
    .map((video) => {
      return `
        <div class="history-item">
          <div><strong>${video.title}</strong></div>
          <div>ID: ${video._id}</div>
          <div>Duration: ${video.duration}</div>
          <div>URL: <a target="_blank" href="${video.videoUrl}">${video.videoUrl}</a></div>
        </div>
      `;
    })
    .join('');
};

const getJson = async (path) => {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: getTokenHeaders(),
  });
  await showResult(response);
  return response;
};

const postJson = async (path, body) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getTokenHeaders(),
    },
    body: JSON.stringify(body),
  });
  await showResult(response);
  return response;
};

const loadProfileBtn = document.getElementById('loadProfileBtn');
const loadHistoryBtn = document.getElementById('loadHistoryBtn');
const addHistoryBtn = document.getElementById('addHistoryBtn');
const homeBtn = document.getElementById('homeBtn');

homeBtn.addEventListener('click', () => {
  window.location.href = './index.html';
});

loadProfileBtn.addEventListener('click', async () => {
  const response = await getJson('/api/v1/users/me');
  if (response.ok) {
    const data = await response.json();
    profileArea.textContent = JSON.stringify(data.data.user, null, 2);
  }
});

loadHistoryBtn.addEventListener('click', async () => {
  const response = await getJson('/api/v1/users/me');
  if (response.ok) {
    const data = await response.json();
    renderHistory(data.data.watchHistory || []);
  }
});

addHistoryBtn.addEventListener('click', async () => {
  const videoId = document.getElementById('historyVideoId').value;
  if (!videoId) {
    resultArea.textContent = 'Please enter a video ID.';
    return;
  }
  await postJson('/api/v1/users/watch-history', { videoId });
});
