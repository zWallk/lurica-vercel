import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { AiFillStar } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import reviews from '../mocks/reviews.json';

export default function Reviews() {
    return (
        <section className="py-3 bg-[#232928]">
            <div className="container mx-auto lg:px-4 px-0">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    loopedSlides={3}
                    slidesPerView={1.2}
                    spaceBetween={15}
                    speed={800}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 1.5,
                                slideShadows: false,
                            }
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 30,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 1.5,
                                slideShadows: false,
                            }
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 1.5,
                                slideShadows: false,
                            }
                        },
                        1280: {
                            slidesPerView: 3.5,
                            spaceBetween: 50,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 1.5,
                                slideShadows: false,
                            }
                        }
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 50,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        waitForTransition: true
                    }}
                    modules={[Autoplay, EffectCoverflow, Navigation]}
                    className="w-full py-8"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide 
                            key={index}
                            className="w-[280px] md:w-[350px] my-8"
                        >
                            <div
                                className="bg-[#1B201E] p-6 rounded-lg shadow-xl h-[240px] transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <div className="flex mb-3">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <AiFillStar key={i} className="text-[#C4BAA6] text-xl" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-3">
                                    {review.text}
                                </p>
                                <div className="mt-auto">
                                    <p className="text-[#C4BAA6] font-semibold">{review.name}</p>
                                    <p className="text-gray-400 text-sm">{review.date}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}