let mas_current_pets = [0,1,2];
window.addEventListener('load',() => {
    let buttom = document.querySelectorAll(".burger-button  , .menu");
    console.log(buttom);
    buttom[0].addEventListener('click', () => {
        [...buttom].forEach(el => el.classList.toggle('active'));
        document.querySelector("body").classList.toggle('lock');
    });
    // let cotolog_buttoms = document.querySelectorAll(".cotolog__button");
    // [...cotolog_buttoms].forEach(el => {
    //         el.addEventListener('click', () => {
    //             if(!el.classList.contains('lock'))
    //             {
                    
    //                 nextPets();
    //                 el.classList.add("lock");
    //             }
    //         });
    // })
    let new_slider = new Slider(
        document.querySelector('.cotolog__content'),
        pets,
        document.querySelectorAll(".cotolog__button")
    )
})



class Slider {
    constructor(node,mas,buttons)
    {
        this.node = node;
        this.current_item = 0;
        this.mas = this.permutation(pets);
        this.buttons = [...buttons];
        this.init();
    }
    init() {
        this.update();
        this.buttons.forEach(el => {
            el.addEventListener('click', () => {
                if(!el.classList.contains('lock')) {
                    this.buttons.forEach(item => item.classList.add('lock'))
                    if(el.classList.contains('button-right')) this.next();
                    if(el.classList.contains('button-left')) this.previous();

                }
            })
        } )
    }
    next() {
        
        let current_node = this.node;
        let next_node = this.get_node_item(this.id_move(1));
        current_node.after(next_node);
        current_node.classList.add('left100');
        current_node.addEventListener('transitionend', ()=> {
            current_node.remove();
        });
        this.node = next_node;
        this.current_item++;

        console.log(current_node);

    }
    previous() {
        let current_node = this.node;
        let previous_node = this.get_node_item(( this.id_move(-1)));
        previous_node.classList.add('left100');
        current_node.addEventListener('transitionend', ()=> {
            console.log("EMNDDDD")
            current_node.remove();
        });
        current_node.before(previous_node);
        setTimeout(()=> {
            previous_node.classList.remove('left100');
        },0)
        setTimeout(() => {
            current_node.remove();
        },1000)
        this.node = previous_node;
        this.current_item--;
    }
    get_node_item(slider_id) {
        let container = this.node.cloneNode(false);

        for(let i = slider_id+1; i<= slider_id+3;i++) {
            let item = this.mas[i%this.mas.length];
            container.insertAdjacentHTML('afterbegin', `
            <div class="cotolog__item">
            <img src="${item.img}" alt="" class="cotolog__image">
            <div class="cotolog__name">${item.name}</div>
            <div class="button section-looking__button "><a href="">Learn more</a></div>
            </div> 
            `);

        }
        container.addEventListener('transitionend', ()=> {
            this.buttons.forEach(el=> el.classList.remove('lock'));
        })

        return container;
    }
    update() {
        let node  = this.get_node_item(this.current_item);
        this.node.replaceWith(node);
        this.node = node;
    }
    move(direction) {

    }
    permutation(mas) {
        for(let i=0;i<mas.length;i++) {
            let r = Math.floor(Math.random()*mas.length);
            [mas[i],mas[r]] = [mas[r],mas[i]];
        }
        return mas;
        
    }
    id_move(step) {
        return (this.mas.length+this.current_item+step)%this.mas.length;
    }
}







