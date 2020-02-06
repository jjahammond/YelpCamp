// Toggle navbar collapse - doesn't work now bootstrap.js is active (needed for modals)
$(document).ready(function() {
  var isVisible = false;
  $(".navbar-toggle").click(function() {
    $(".navbar-collapse").slideToggle('fast');
    isVisible = !isVisible;
  });
  $(document).on("click", function(event) {
    var trigger = $(".navbar-toggle")[0];
    var dropdown = $(".navbar-collapse");
    if (isVisible && dropdown !== event.target && !dropdown.has(event.target).length && trigger !== event.target) {
      $(".navbar-collapse").slideUp('fast');
      isVisible = false;
    }
  });

  // Collapse alerts after 3s
  setTimeout(function(){
    $("div.alert").slideUp('fast');
  }, 3000 ); // 5 secs
});

// Scroll to top on home click
$('#home-scroll').on("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Fill edit comment modal with current data
$('#editCommentModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var commentText = button.data('text'); // Extract info from data-* attributes
  var commentId = button.data('id');

  var modal = $(this);
  modal.find('.modal-body textarea').text(commentText);
  var commentsRoute = modal.find('.modal-body form').attr('action')
  modal.find('.modal-body form').attr('action', commentsRoute + commentId + '?_method=PUT');
});
