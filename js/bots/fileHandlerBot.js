  const fileUrl = message.file_url;
  const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

  fetch(fileUrl)
    .head()
    .then(response => {
      const fileSize = response.headers.get('Content-Length');
      const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1);

      const fileHTML = `
        <a href="${fileUrl}" download>
          <button class="btn btn-dark btn-sm">
            <span class="file-info">
              <span class="file-size">${(fileSize / 1024).toFixed(2)} KB</span>
              <span class="file-ext">.${fileExt}</span>
            </span>
            Download File
            <i class="fas fa-download"></i>
          </button>
        </a>
      `;

      displayMessage(fileHTML);
    });