// blogPostsData remains the same
const blogPostsData = [
  {
    id: "post1",
    title: "IT Experience",
    content:
      "Over the years, I have built up solid IT experience working with network systems, troubleshooting technical issues, and implementing innovative solutions. This background keeps me on the cutting edge of technology.",
    thumbnailUrl: "./First-Project-main/ITexperience.png", // Ensure these paths are correct
    likes: 0,
    dislikes: 0,
    comments: [],
    date: "2024-10-26",
  },
  {
    id: "post2",
    title: "Fictional Dog",
    content:
      "My fictional dog, Buddy, is a spirited and loyal companion who always brings energy and excitement wherever he goes. His playful antics and warm nature make every day an adventure, reminding me of the simple joys in life.",
    thumbnailUrl: "./First-Project-main/dog.jpeg",
    likes: 0,
    dislikes: 0,
    comments: [],
    date: "2024-10-26",
  },
  {
    id: "post3",
    title: "Hobbies",
    content:
      "I enjoy a mix of creative and active hobbies, from photography and painting to hiking and reading. These activities help me unwind and spark my imagination.",
    thumbnailUrl: "./First-Project-main/hobbies.png",
    likes: 0,
    dislikes: 0,
    comments: [],
    date: "2024-10-26",
  },
  {
    id: "post4",
    title: "Programming Jobs",
    content:
      "I’m currently engaged in various programming projects, ranging from web development to mobile app design. Each project challenges me to innovate and continuously improve my coding skills while collaborating with dynamic teams.",
    thumbnailUrl: "./First-Project-main/cpu.png",
    likes: 0,
    dislikes: 0,
    comments: [],
    date: "2024-10-26",
  },
  {
    id: "post5",
    title: "Summer",
    content:
      "Summer brings a refreshing energy with longer days and warm weather. I love taking advantage of the season with outdoor adventures, relaxing by the beach, and exploring nature’s beauty for inspiration.",
    thumbnailUrl: "./First-Project-main/summer.jpeg",
    likes: 0,
    dislikes: 0,
    comments: [],
    date: "2024-10-26",
  },
  {
    id: "post6",
    title: "Fictional Cat",
    content:
      "My fictional cat, Whiskers, exudes elegance and mystery. With a graceful demeanor and curious spirit, Whiskers adds a touch of magic to my home, blending independence with affectionate moments that brighten my day.",
    thumbnailUrl: "./First-Project-main/cat.jpeg",
    likes: 0,
    dislikes: 0,
    comments: [],
    date: "2024-10-26",
  },
];

$(document).ready(function () {



  // Cache jQuery selections for elements that are static or updated by these functions
  const $blogContainer = $(".blog");
  const $recentPostThumbnail = $(".recent-posts .thumb img");
  const $recentPostTitle = $(".recent-posts .content h4");
  const $recentPostCommentP = $(".recent-posts .content p"); // Renamed for clarity
  const $recentPostDate = $(".recent-posts .content span");
  const $recentPostLink = $(".recent-posts .wrapper a");

  // --- MODAL LOGIC (Start) ---
  const modalHTML = `
        <div class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p>"Welcome to the Gates of Hell! Once you step through, 
                your soul embarks on an all-inclusive journey to the Void—no refunds, no exits,
                and definitely no customer service. Please keep your arms, legs, 
                and existential dread inside the ride at all times. 
                Don’t worry, the screaming stops after a few centuries… or so they say. 
                Enjoy your stay—forever!" 😈🔥</p>
            </div>
        </div>`;
  const $modal = $(modalHTML).appendTo("body"); // Create and append, will be visible due to CSS

  $("body").css("overflow", "hidden"); // Prevent scrolling

  // Event listener for close button using event delegation on the modal itself
  $modal.on("click", ".close-button", function () {
    $modal.fadeOut(function () {
      // Use fadeOut for smoother disappearance
      $("body").css("overflow", "auto"); // Re-enable scrolling
      // Optional: $(this).remove(); // If you want to remove the modal from DOM after closing
    });
  });
  // --- MODAL LOGIC (End) ---

  // --- Blog Rendering and Event Handling ---
  function renderBlogPosts() {
    $blogContainer.empty(); // Clear existing content

    $.each(blogPostsData, function (index, post) {
      const blogItemHTML = `
        <div class="blog-item" data-internal-post-id="${post.id}"> <div class="blog-post">
                <div class="thumbnail">
                    <img src="${post.thumbnailUrl}" alt="${post.title}">
                </div>
            </div>
            <div class="blog-content">
                <span>My Likes</span>
                <h3>Likes: <span class="like-count" data-post-id="${post.id}">${post.likes}</span>, Dislikes: <span class="dislike-count" data-post-id="${post.id}">${post.dislikes}</span></h3>
                <p><strong>${post.title}:</strong> ${post.content}</p>
                <div class="like-dislike">
                    <button class="like-btn" type="button" data-post-id="${post.id}">
                        <img src="./First-Project-main/thumdup3.png" alt="Like">
                    </button>
                    <button class="dislike-btn" type="button" data-post-id="${post.id}">
                        <img src="./First-Project-main/thumbDown2.jpeg" alt="Dislike">
                    </button>
                    <button class="comment-btn" type="button" data-post-id="${post.id}">
                        <img src="./First-Project-main/comment.png" alt="comment" />
                    </button>
                </div>
                <input type="text" class="comment" placeholder="add your comments" data-post-id="${post.id}" style="display: none;">
                <button class="add-btn" type="button" data-post-id="${post.id}" style="display: none;">add comment</button>
            </div>
        </div>`;
      $blogContainer.append(blogItemHTML);
    });
  }

  // Event Handling for dynamically created blog items (delegated from $blogContainer)
  $blogContainer.on("click", ".comment-btn", function () {
    const $blogItem = $(this).closest(".blog-item");
    const $commentInput = $blogItem.find(".comment");
    const $addSubmitBtn = $blogItem.find(".add-btn");

    $commentInput.slideToggle("fast", function () {
      if ($(this).is(":visible")) {
        $(this).focus();
      }
    });
    $addSubmitBtn.slideToggle("fast");
  });

  $blogContainer.on("click", ".add-btn", function () {
    const $addSubmitBtn = $(this);
    const $blogItem = $addSubmitBtn.closest(".blog-item");
    const $commentInput = $blogItem.find(".comment");
    const commentText = $commentInput.val().trim();
    const postId = $addSubmitBtn.data("post-id");

    if (commentText) {
      const currentPost = blogPostsData.find((post) => post.id === postId);
      if (currentPost) {
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0];
        currentPost.comments.push({ text: commentText, date: formattedDate });
        renderRecentPost(postId); // Update recent post view
      }

      $commentInput.val("");
      $commentInput.slideUp("fast");
      $addSubmitBtn.slideUp("fast");
    } else {
      $commentInput.focus(); // If no text, just re-focus
    }
  });

  $blogContainer.on("click", ".like-btn", function () {
    const postId = $(this).data("post-id");
    const postIndex = blogPostsData.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      blogPostsData[postIndex].likes++;
      updateLikeCount(postId);
    }
  });

  $blogContainer.on("click", ".dislike-btn", function () {
    const postId = $(this).data("post-id");
    const postIndex = blogPostsData.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      blogPostsData[postIndex].dislikes++;
      updateDislikeCount(postId);
    }
  });

  function updateLikeCount(postId) {
    const $likeCountSpan = $blogContainer.find(
      `.like-count[data-post-id="${postId}"]`
    );
    if ($likeCountSpan.length) {
      const post = blogPostsData.find((p) => p.id === postId);
      $likeCountSpan.text(post.likes);
    }
  }

  function updateDislikeCount(postId) {
    const $dislikeCountSpan = $blogContainer.find(
      `.dislike-count[data-post-id="${postId}"]`
    );
    if ($dislikeCountSpan.length) {
      const post = blogPostsData.find((p) => p.id === postId);
      $dislikeCountSpan.text(post.dislikes);
    }
  }

  function renderRecentPost(postId) {
    const postData = blogPostsData.find((post) => post.id === postId);
    if (postData) {
      if ($recentPostThumbnail.length)
        $recentPostThumbnail.attr("src", postData.thumbnailUrl);
      if ($recentPostTitle.length) $recentPostTitle.text(postData.title);

      if (postData.comments.length > 0) {
        const lastComment = postData.comments[postData.comments.length - 1];
        if ($recentPostDate.length)
          $recentPostDate.text(`Posted on: ${lastComment.date}`);
        if ($recentPostCommentP.length)
          $recentPostCommentP.text(lastComment.text);
        if ($recentPostLink.length)
          $recentPostLink.text(`${postData.comments.length} comments`);
      } else {
        if ($recentPostDate.length)
          $recentPostDate.text(`Posted on: ${postData.date}`);
        if ($recentPostCommentP.length)
          $recentPostCommentP.text("No comments yet");
        if ($recentPostLink.length) $recentPostLink.text("No comments yet");
      }
    }
  }

  // Initial rendering of blog posts
  renderBlogPosts();

  // --- Dark Mode Toggle ---
  $("#dark-btn").on("click", function () {
    $("body").toggleClass("dark-mode");
  });

 
}); // End of $(document).ready()
