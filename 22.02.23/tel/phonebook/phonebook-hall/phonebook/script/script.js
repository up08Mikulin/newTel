'use strict';
const data = [
    {
        name: 'Иван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Игорь',
        surname: 'Семёнов',
        phone: '+79999999999',
    },
    {
        name: 'Семён',
        surname: 'Иванов',
        phone: '+79800252525',
    },
    {
        name: 'Мария',
        surname: 'Попова',
        phone: '+79876543210',
    },
];

{
    const addContactData = contact => {
        data.push(contact);
        console.log(data);
    };
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };
    const createHeader = () =>{
        const header = document.createElement('header');
        header.classList.add('header');
        const headerContainer = createContainer();
        header.append(headerContainer);
        header.headerContainer = headerContainer;
        return header;
    };
    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;
        return h1;
    };
    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;
        return main;
    };
    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.type = type;
            button.className = className;
            button.textContent = text;
            return button;
        });
        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete"> Удалить</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th class="edit edit-button">Действие</th>
            </tr>   
        `);

        const tbody = document.createElement('tbody');
        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
        <button class="close" type="button"></button>
        <h2 class="form-title"> Добавить контакт</h2>
            <div class="form-group">
                <label for="name" class="form-label"> Имя</label>
                <input type="text" class="form-input" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="surname" class="form-label"> Фамилия</label>
                <input type="text" class="form-input" id="surname" name="surname" required>
            </div>
            <div class="form-group">
                <label for="phone" class="form-label"> Телефон</label>
                <input type="text" class="form-input" id="phone" name="phone" required>
            </div>
        `);
        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);
        form.append(...buttonGroup.btns);
        overlay.append(form);
        return {
            overlay,
            form,
        };
    };

    const createFormInfo = () => {
        const contactName = document.querySelectorAll('tr.contact td:nth-child(2)');
        const contactSurname = document.querySelectorAll('tr.contact td:nth-child(3)');
        const contactPhone = document.querySelectorAll('tr.contact td:nth-child(4) a');
        let btnsEdit = document.querySelectorAll('tr.contact .edit.mr-3');
        const contactLast = document.querySelector('.contact:last-child');
        const formTitle = document.querySelector('.form-title');
        const tableButtonEdit = document.querySelector('.contact .btn.btn-primary.mr-3');
        const formButtonEdit = document.querySelector('.form .btn.btn-primary.mr-3');
        const formOverlay = document.querySelector('.form-overlay');
        // Форма
        const formName = document.querySelector('.form input[name=name]');
        const formSurname = document.querySelector('.form input[name=surname]');
        const formPhone = document.querySelector('.form input[name=phone]');
        const editButton = document.querySelector('.btn.btn-primary.mr-3.edit-btn');
        let editContactBtns = document.querySelectorAll('.edit');
        const form = document.querySelector('form.form');
        const addButton = document.querySelector('.add.mr-3');
        const deleteButton = document.querySelector('.btn.btn-danger.mr-3');
        const editButtonSecond = document.querySelectorAll('.edit-button');
        const addButtonForm = document.querySelector('button[type=submit].btn.btn-primary.mr-3');
        addButton.addEventListener('click', () => {
            for (let i = 0; i < editButtonSecond.length; i++) {
                editButtonSecond[i].classList.add('edit');
            }
            formTitle.textContent = 'Добавить контакт';
            formButtonEdit.textContent = 'Добавить';
            formButtonEdit.type = 'submit';
            form.reset();
        });
        
        editButton.addEventListener('click', () => {
            btnsEdit = document.querySelectorAll('tr.contact .edit.mr-3');
            editContactBtns = document.querySelectorAll('.edit');
            for (let i = 0; i < editContactBtns.length; i++) {
                if (!editContactBtns[i].classList.contains('edit')) {
                    editContactBtns[i].classList.add('edit');
                } else {
                    editContactBtns[i].classList.remove('edit');
                }
            }
        });
        
        for (let i = 0; i < btnsEdit.length; i++) {
            btnsEdit[i].addEventListener('click', () => {
                formTitle.textContent = 'Редактировать контакт';
                formButtonEdit.textContent = 'Редактировать';
                formButtonEdit.type = 'button';
                tableButtonEdit.textContent = 'Редактировать';
                formName.value = contactName[i].textContent;
                formSurname.value = contactSurname[i].textContent;
                formPhone.value = contactPhone[i].textContent;
                modalControl(btnsEdit[i], formOverlay);
                formButtonEdit.addEventListener('click', () => {
                    contactName[i].textContent = formName.value;
                    contactSurname[i].textContent = formSurname.value;
                    contactPhone[i].textContent = formPhone.value;
                    formOverlay.classList.remove('is-visible');
                });
            });
        };
    };

    const createFooter = (title) => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');
        const footerContainer = createContainer();
        footerContainer.insertAdjacentHTML('beforeend', `<span>Все права защищены &copy; ${title}</span>`)
        footer.append(footerContainer);
        footer.footerContainer = footerContainer;
        return footer;
    };
    
    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const main = createMain();
        const buttonGroup = createButtonsGroup([
                {
                    className: 'btn btn-primary mr-3 add',
                    type: 'button',
                    text: 'Добавить',
                },
                {
                    className: 'btn btn-danger mr-3',
                    type: 'button',
                    text: 'Удалить',
                },
                {
                    className: 'btn btn-primary mr-3 edit-btn',
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
            formOverlay: overlay,
            form,
        };
    };

    const createRow = ({name, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');
        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);
        const tdName = document.createElement('td');
        tdName.classList.add("name");
        tdName.textContent = name;
        const tdSurname = document.createElement('td');
        tdSurname.classList.add("surname");
        tdSurname.textContent = surname;
        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.classList.add("phone")
        phoneLink.href = `tel: ${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        const tdButton = document.createElement('td');
        tdButton.classList.add('btn', 'btn-primary', 'mr-3');
        tdButton.textContent = ' Редактировать';
        tdButton.classList.add('edit', 'edit-button');
        tdPhone.append(phoneLink);
        tr.append(tdDel, tdName, tdSurname, tdPhone, tdButton);
        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

    const modalControl = (btnAdd, formOverlay) => {
        const openModal = () => {
            formOverlay.classList.add('is-visible');
        };
        const closeModal = () => {
            formOverlay.classList.remove('is-visible');
        };
        btnAdd.addEventListener('click', openModal);
        formOverlay.addEventListener('click', (e) => {
            const target = e.target;
            if (target === formOverlay || target.classList.contains('close')) {
                closeModal();
            };
        });
        return {
            closeModal,
        };
    };

    const deleteControl = (btnDel, list) => {
        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            });
        });
        list.addEventListener('click', e => {
            const target = e.target;
            if(target.closest('.del-icon')){
                target.closest('.contact').remove();
            }
        });
    };

    const addContactPage = (contact, list) =>{
        list.append(createRow(contact));
    };

    const formControl = (form, list, closeModal) => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newContact = Object.fromEntries(formData);
            addContactPage(newContact, list);
            addContactData(newContact);
            form.reset();
            closeModal();
        });
    };

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const {
            list,
            logo,
            btnAdd,
            btnDel,
            formOverlay,
            form
        } = renderPhoneBook(app, title);

        
        const allRow = renderContacts(list, data);
        const {closeModal} = modalControl(btnAdd,formOverlay);

        hoverRow(allRow, logo);
        deleteControl(btnDel,list );
        formControl(form, list, closeModal);
        createFormInfo();
        document.addEventListener('touchstart', e => {
            console.log(e.type);
        });
        document.addEventListener('touchmove', e => {
            console.log(e.type);
        });
        document.addEventListener('touchend', e => {
            console.log(e.type);
        });
        
        const contacts = document.querySelectorAll(".contact");
        const contactsArray = []
        function Contact (name, surname, phone)  {
            this.name = name;
            this.surname = surname;
            this.phone = phone;
        };

        const addToArray = (nodeList) => {
            for (let i = 0; i <= nodeList.length; i++) {
                appendContact(contacts)
            }
            
        }
        const appendContact = (array) => {
            // let contact = new Contact(array.childNodes[1].textContent, array.childNodes[2].textContent, array.childNodes[3].textContent);
            console.log(array.childNodes[1].textContent)
            Object.assign(contactsArray, contact);
        }
        addToArray(contacts);
        // // for (let i = 0; i <= contacts.length; i++) {
        // //     let contact = new Contact(i.childNodes[1].textContent, i.childNodes[2].textContent, i.childNodes[3].textContent);
        // //     Object.assign(contactsArray, contact);
        // // }
        // console.log(contactsArray)
        // contacts.forEach(element => {
        //     // let name = String(element.childNodes[1].textContent);
        //     let contact = new Contact(element.childNodes[1].textContent, element.childNodes[2].textContent, element.childNodes[3].textContent)
        //     // contact.append(contactsArray);
        //     Object.assign(contactsArray, contact)
           
        // //    console.log(element.childNodes[1].textContent)
        // });
        console.log(contactsArray);

        
        // const contacts = document.querySelectorAll(".contact");
        // contacts.forEach(element => {
        //     console.log(element)
        // });
        // localStorage.contacts = {};
        // localStorage['contacts'].contact = {name: "Петя"};
        // console.log(JSON.parse(localStorage['contacts'].contact))

        // names.forEach(name => {
        //     localStorage.users = ('name1', name[0].textContent);
        // });
        // for (i = 0; i <=)
    
        // localStorage.data = da
    };
    
    // const names = document.querySelectorAll(".name");

    // localStorage.contacts = {};
    // localStorage['contacts'].contact = {name: "Петя"};
    // console.log(JSON.parse(localStorage['contacts'].contact))
    // names.forEach(name => {
    //     localStorage['users'] = ('name', name.textContent);
    // });

    // console.log(localStorage['users'].name);
    // console.log(localStorage['users'])
    // contacts.forEach(contact => {
    //     localStorage.setItem('')
    // });
    // localStorage
    // let myStorage = window.localStorage;
    // localStorage.setItem('users', {})
    
    window.phoneBookInit = init;
}
