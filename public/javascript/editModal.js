$('#editCommentModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var commentText = button.data('text'); // Extract info from data-* attributes
  var commentId = button.data('id');

  var modal = $(this);
  modal.find('.modal-body textarea').text(commentText);
  var commentsRoute = modal.find('.modal-body form').attr('action')
  modal.find('.modal-body form').attr('action', commentsRoute + commentId + '?_method=PUT');
})
