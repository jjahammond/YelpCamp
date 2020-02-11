$(document).ready(function() {

  var $nav = $(".navbar.navbar-default");
  var $nava = $(".navbar-default .navbar-nav > li > a");
  $nav.toggleClass("scrolled", $(this).scrollTop() > 0);
  $nava.toggleClass("scrolled", $(this).scrollTop() > 0);
  // Fade in navbar
  $(document).scroll(function(){
    $nav.toggleClass("scrolled", $(this).scrollTop() > 0);
    $nava.toggleClass("scrolled", $(this).scrollTop() > 0);
  });

  // Toggle navbar collapse
  $(document).on("click", function(event) {
    var trigger = $(".navbar-toggle")[0];
    var dropdown = $(".navbar-collapse");
    var isSpanClick = event.target === $('.icon-bar')[0] || event.target === $('.icon-bar')[1] || event.target === $('.icon-bar')[2];
    if (trigger !== event.target && !isSpanClick) {
      $(".navbar-collapse").collapse('hide');
    }
  });


  // Collapse alerts after 3s
  setTimeout(() => {
    $("div.alert").slideUp('slow');
  }, 3000 ); // 3 secs


  // Scroll to top on home click
  $('.home-scroll').on("click", () => {
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

});
