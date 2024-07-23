function fileHandlerBot() {
  const message = messageInput.value;
  if (message.startsWith('/file send')) {
    const fileUrl = message.slice('/file send'.length).trim();;
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    const fileHTML = `
    <a href="${fileUrl}" download>
    <button class="btn btn-dark btn-sm">
    Download ${fileName}
    <i class="fas fa-download"></i>
    </button>
    </a>
    `;
    mainChannel.message(fileHTML);
  };
};
