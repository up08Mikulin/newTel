'use strict';
const data = [
    {
        name: 'Иван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Мария',
        surname: 'Попова',
        phone: '+79876543210',
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
];

    
    const getStorage = () => (localStorage.getItem('data')) ? JSON.parse(localStorage.getItem("data")) : [];
    let local = getStorage();

    const setStorage = () => {
        if (local == [] ) {
            localStorage.setItem("data", JSON.stringify(data));
            return getStorage();
        } else  {
            localStorage.setItem("data", JSON.stringify(local));
            return getStorage();
        }
    };
    
    

    setStorage();
    

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const { list, logo, btnAdd, btnDel, btnEdit, formOverlay, form } = renderPhoneBook(app, title);

        // функционал
        const allRow = renderContacts(list, local);
        const {closeModal} = modalControl(btnAdd,formOverlay);

        hoverRow(allRow, logo);
        deleteControl(btnDel,list );
        editControl(btnEdit,list );
        formControl(form, list, closeModal);
        console.log(local);
        // setTimeout(() => {
        //     const contact = createRow({
        //         name: 'Мария',
        //         surname: 'Карцева',
        //         phone: '+7987111111',
        //     });
        //     list.append(contact);
        // }, 2000);
        // действия на телефоне пальцами
        document.addEventListener('touchstart', e => {
            console.log(e.type);
        });
        document.addEventListener('touchmove', e => {
            console.log(e.type);
        });
        document.addEventListener('touchend', e => {
            console.log(e.type);
        });
        // ========================
    };

/* ======================================== */

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

    const editControl = (btnEdit,list ) => {
        btnEdit.addEventListener('click', () => {
            document.querySelectorAll('.edit').forEach(edit => {
                edit.classList.toggle('is-visible');
            });
        });
        list.addEventListener('click', e => {
            const target = e.target;
            if(target.closest('.edit-icon')){
                alert('Form');
                createForm();
            }
        });
    };

    window.phoneBookInit = init;



// Смена темы
let colorBodyArr = [ "#969696", "#fff" ]; 
let i = 0; 
function changeTheme() {
    document.body.style.background = colorBodyArr[i]; 
    i++;
    if ( i > colorBodyArr.length - 1) {
        i = 0;
    }
}








