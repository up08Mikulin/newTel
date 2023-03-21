'use script';

const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'button',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'button',
                text: 'Удалить',
            },
            {
                className: 'btn btn-edit',
                type: 'button',
                text: 'Редактировать',
            },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter(title);
    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    app.append(header, main, footer);
    return {
        list: table.tbody,
        logo,
        btnAdd: buttonGroup.btns[0],
        btnDel: buttonGroup.btns[1],
        btnEdit: buttonGroup.btns[2],
        btnTopic: buttonGroup.btns[3],
        formOverlay: overlay,
        form,
    };
};
const renderContacts = (elem, local) => {
    const allRow = local.map(createRow);
    elem.append(...allRow);
    return allRow;
};