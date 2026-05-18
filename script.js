document.getElementById('board-form').addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 입력값 가져오기
    const usernameInput = document.getElementById('username');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const username = usernameInput.value;
    const title = titleInput.value;
    const content = contentInput.value;
    
    // 현재 시간 구하기
    const date = new Date().toLocaleString('ko-KR', { hour12: false }).slice(0, -3);

    // 게시글을 추가할 컨테이너 선택
    const postsContainer = document.getElementById('posts-container');

    // '아직 등록된 글이 없습니다' 문구 제거
    const noPostsMessage = document.querySelector('.no-posts');
    if (noPostsMessage) {
        noPostsMessage.remove();
    }

    // 새로운 게시글 HTML 구조 생성
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    
    postCard.innerHTML = `
        <h3 class="post-title">${escapeHtml(title)}</h3>
        <div class="post-meta">작성자: ${escapeHtml(username)} | 작성일: ${date}</div>
        <p class="post-content">${escapeHtml(content)}</p>
        <button class="delete-btn">삭제</button>
    `;

    // 삭제 버튼 기능 추가
    postCard.querySelector('.delete-btn').addEventListener('click', function() {
        postCard.remove();
        updatePostCount();
        
        // 만약 모든 글이 지워졌다면 안내 문구 다시 띄우기
        if (postsContainer.children.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts">아직 등록된 글이 없습니다. 첫 글을 남겨보세요!</p>';
        }
    });

    // 최신글이 위로 오도록 맨 앞에 추가
    postsContainer.insertBefore(postCard, postsContainer.firstChild);

    // 입력창 초기화
    usernameInput.value = '';
    titleInput.value = '';
    contentInput.value = '';

    // 글 개수 업데이트
    updatePostCount();
});

// 총 게시글 수 업데이트 함수
function updatePostCount() {
    const count = document.querySelectorAll('.post-card').length;
    document.getElementById('post-count').textContent = count;
}

// 보안을 위한 HTML 텍스트 이스케이프 함수 (XSS 방지)
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}