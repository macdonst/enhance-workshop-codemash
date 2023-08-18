export default function linkPage({ html, state }) {
  const { linkPage } = state.store

  return html`
    <style>
        .container {
            width: 80%;
            text-align: center;
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            justify-items: center;
        }

        h1, p {
            grid-column: 1 / -1;
        }

        .btn {
            width: 100%;
            padding: 20px;
            text-decoration: none;
            font-size: 20px;
            color: var(--color-dark);
            background: lightgreen ;
            border-radius: 5px;
            transition: background 0.3s;
        }

        .btn:hover {
            background: #0056b3;
        }

        @media screen and (min-width: 600px) {
            .container {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
    <main class="container">
    <h1 class="">${linkPage.title || ''}</h1>
    <p>${linkPage.description || ''}</p>

    ${linkPage.linkUrl1 ? `<a href="${linkPage.linkUrl1}" class="btn" target="_blank">${linkPage.linkText1}</a>` : ''}
    ${linkPage.linkUrl2 ? `<a href="${linkPage.linkUrl2}" class="btn" target="_blank">${linkPage.linkText2}</a>` : ''}
    ${linkPage.linkUrl3 ? `<a href="${linkPage.linkUrl3}" class="btn" target="_blank">${linkPage.linkText3}</a>` : ''}
    ${linkPage.linkUrl4 ? `<a href="${linkPage.linkUrl4}" class="btn" target="_blank">${linkPage.linkText4}</a>` : ''}
    ${linkPage.linkUrl5 ? `<a href="${linkPage.linkUrl5}" class="btn" target="_blank">${linkPage.linkText5}</a>` : ''}
    ${linkPage.linkUrl6 ? `<a href="${linkPage.linkUrl6}" class="btn" target="_blank">${linkPage.linkText6}</a>` : ''}
    ${linkPage.linkUrl7 ? `<a href="${linkPage.linkUrl7}" class="btn" target="_blank">${linkPage.linkText7}</a>` : ''}
    ${linkPage.linkUrl8 ? `<a href="${linkPage.linkUrl8}" class="btn" target="_blank">${linkPage.linkText8}</a>` : ''}
    ${linkPage.linkUrl9 ? `<a href="${linkPage.linkUrl9}" class="btn" target="_blank">${linkPage.linkText9}</a>` : ''}
    ${linkPage.linkUrl10 ? `<a href="${linkPage.linkUrl10}" class="btn" target="_blank">${linkPage.linkText10}</a>` : ''}
    </main>
`
}
