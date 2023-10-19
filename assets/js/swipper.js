import { url } from "./url.js";

const swiper_module = document.getElementById("swiper_module");

(async () => {
    const response = await fetch(`${url}api/teams`);
    const { teamsGroupA, teamsGroupB } = await response.json();
    const combinedTeams = teamsGroupA.concat(teamsGroupB);
    for(let team of combinedTeams){
        let swipperElement = document.createElement("div");
        swipperElement.classList.add("swiper-slide");
        const imgSrc = team.logo || "https://res.cloudinary.com/dzd68sxue/image/upload/v1695396332/WEBP/default-bnoacd-1_qnmcps.webp";
        const htmlTemplate = `
            <img class="swipper_img" src=${imgSrc} title=${team.team}>
            <span>${team.team}</span>
        `;
        swipperElement.innerHTML = htmlTemplate;
        swiper_module.appendChild(swipperElement);
    }

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            840: {
                slidesPerView: 4,
            },
            1300: {
                slidesPerView: 5,
            }
        }
    
    });
})();

