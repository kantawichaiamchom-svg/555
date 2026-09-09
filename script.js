const loginButton = document.getElementById('loginButton');
        const signupButton = document.getElementById('signupButton');
        const loginModal = document.getElementById('loginModal');
        const closeLogin = document.getElementById('closeLogin');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const loginName = document.getElementById('loginName');
        const loginPassword = document.getElementById('loginPassword');
        const signupName = document.getElementById('signupName');
        const signupEmail = document.getElementById('signupEmail');
        const signupPassword = document.getElementById('signupPassword');
        const authDescription = document.getElementById('authDescription');
        const loginError = document.getElementById('loginError');
        const loginSuccess = document.getElementById('loginSuccess');
        const signupError = document.getElementById('signupError');
        const signupSuccess = document.getElementById('signupSuccess');
        const savedUserKey = 'dealRoomUser';
        const dashboardPage = document.getElementById('dashboardPage');
        const dashboardUserName = document.getElementById('dashboardUserName');
        const logoutButton = document.getElementById('logoutButton');
        const headerUserName = document.getElementById('headerUserName');
        const headerBookingsButton = document.getElementById('headerBookingsButton');
        const headerLogoutButton = document.getElementById('headerLogoutButton');
        const loggedInKey = 'dealRoomLoggedIn';
        const contentPage = document.getElementById('contentPage');

        function getBookingsKey() {
            const savedUser = JSON.parse(localStorage.getItem(savedUserKey) || 'null');
            return savedUser && savedUser.name ? `dealRoomBookings_${savedUser.name}` : 'dealRoomBookings_guest';
        }

        const contentPages = {
            home: {
                title: 'Welcome to DealRoom',
                description: 'จองที่พักที่เหมาะกับคุณ พร้อมดีลพิเศษและราคาที่ชัดเจน',
                cards: [
                    ['ค้นหาที่พักง่าย', 'เลือกสถานที่ วันเข้าพัก และจำนวนผู้เข้าพักได้ในที่เดียว'],
                    ['ราคาชัดเจน', 'ดูราคาต่อคืนและราคาที่ปรับตามจำนวนผู้เข้าพักได้ทันที'],
                    ['ดีลพิเศษ', 'พบข้อเสนอที่คุ้มค่าสำหรับการเดินทางครั้งถัดไป']
                ],
                button: 'เริ่มค้นหาโรงแรม',
                action: 'hotels'
            },
            hotels: {
                title: 'Hotels',
                description: 'เลือกดูโรงแรมยอดนิยมและรายละเอียดห้องพักในประเทศไทย',
                cards: [
                    ['Ocean Blue Resort', 'Phuket, Thailand · ฿2,500 / night'],
                    ['Teal Paradise Hotel', 'Krabi, Thailand · ฿1,900 / night'],
                    ['Luxury Beach Resort', 'Koh Samui, Thailand · ฿3,200 / night']
                ],
                button: 'กลับไปหน้าค้นหา',
                action: 'home'
            },
            deals: {
                title: 'Deals',
                description: 'ข้อเสนอพิเศษสำหรับสมาชิก DealRoom',
                cards: [
                    ['ลดสูงสุด 30%', 'รับส่วนลดโรงแรมที่ร่วมรายการสำหรับทริปถัดไป'],
                    ['สมาชิก Gold', 'รับสิทธิ์ดูดีลพิเศษและราคาสมาชิกก่อนใคร'],
                    ['จองวันนี้คุ้มกว่า', 'เลือกที่พักยอดนิยมพร้อมราคาเริ่มต้นที่ดีที่สุด']
                ],
                button: 'ดูโรงแรมทั้งหมด',
                action: 'hotels'
            },
            about: {
                title: 'About Us',
                description: 'DealRoom ช่วยให้การค้นหาและจองที่พักเป็นเรื่องง่ายสำหรับทุกการเดินทาง',
                cards: [
                    ['Trusted booking', 'ข้อมูลที่พักและราคาถูกจัดวางให้ดูได้ง่าย'],
                    ['Local destinations', 'ค้นพบสถานที่พักยอดนิยมในประเทศไทย'],
                    ['Support', 'ทีมงานพร้อมช่วยเหลือเมื่อคุณต้องการ']
                ],
                button: 'กลับหน้าแรก',
                action: 'home'
            }
        };

        function showContentPage(pageName) {
            const page = contentPages[pageName];
            if (!page) {
                return;
            }

            document.querySelector('main').style.display = 'none';
            document.querySelector('footer').style.display = 'none';
            dashboardPage.classList.remove('is-visible');
            contentPage.innerHTML = `
                <div class="content-page-header">
                    <div class="dashboard-kicker">DealRoom</div>
                    <h1>${page.title}</h1>
                    <p>${page.description}</p>
                </div>
                <div class="content-page-grid">
                    ${page.cards.map(([title, text]) => `<article class="content-page-card"><h2>${title}</h2><p>${text}</p><button class="btn btn-outline" type="button">View Details</button></article>`).join('')}
                </div>
                <div class="content-page-actions">
                    <button class="btn btn-primary" data-content-action="${page.action}" type="button">${page.button}</button>
                    <button class="btn btn-outline" data-content-action="home" type="button">Home</button>
                </div>`;
            contentPage.classList.add('is-visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function showDashboard(userName) {
            document.querySelector('main').style.display = 'none';
            document.querySelector('footer').style.display = 'none';
            contentPage.classList.remove('is-visible');
            dashboardPage.classList.add('is-visible');
            dashboardUserName.textContent = userName;
            headerUserName.textContent = `ผู้ใช้: ${userName}`;
            headerUserName.style.display = 'inline-flex';
            loginButton.style.display = 'none';
            signupButton.style.display = 'none';
            headerLogoutButton.style.display = 'inline-block';
                headerBookingsButton.style.display = 'inline-block';
            localStorage.setItem(loggedInKey, 'true');
            closeLoginModal();
        }

        function showHotelPage() {
            localStorage.removeItem(loggedInKey);
            dashboardPage.classList.remove('is-visible');
            contentPage.classList.remove('is-visible');
            document.querySelector('main').style.display = '';
            document.querySelector('footer').style.display = '';
            headerUserName.textContent = '';
            headerUserName.style.display = 'none';
            loginButton.style.display = '';
            signupButton.style.display = '';
            headerLogoutButton.style.display = 'none';
                headerBookingsButton.style.display = 'none';
        }

        function showHotelCatalog() {
            dashboardPage.classList.remove('is-visible');
            contentPage.classList.remove('is-visible');
            document.querySelector('main').style.display = '';
            document.querySelector('footer').style.display = '';
            document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
        }

        function showLoginForm() {
            loginForm.classList.remove('is-hidden');
            signupForm.classList.add('is-hidden');
            document.getElementById('loginTitle').textContent = 'Log In';
            authDescription.textContent = 'Enter your name and password to continue.';
            loginName.focus();
        }

        function showSignupForm() {
            loginForm.classList.add('is-hidden');
            signupForm.classList.remove('is-hidden');
            document.getElementById('loginTitle').textContent = 'Sign Up';
            authDescription.textContent = 'Create an account and save your details for next time.';
            signupName.focus();
        }

        function restoreLoggedInSession() {
            const savedUser = JSON.parse(localStorage.getItem(savedUserKey) || 'null');
            if (localStorage.getItem(loggedInKey) === 'true' && savedUser) {
                showDashboard(savedUser.name);
            }
        }

        function openLogin() {
            loginModal.classList.add('is-open');
            showLoginForm();
            const savedUser = JSON.parse(localStorage.getItem(savedUserKey) || 'null');
            if (savedUser) {
                loginName.value = savedUser.name;
                loginPassword.value = savedUser.password;
            }
        }

        function closeLoginModal() {
            loginModal.classList.remove('is-open');
            loginForm.reset();
            signupForm.reset();
            loginError.textContent = '';
            loginSuccess.textContent = '';
            signupError.textContent = '';
            signupSuccess.textContent = '';
        }

        loginButton.addEventListener('click', openLogin);
        signupButton.addEventListener('click', () => {
            loginModal.classList.add('is-open');
            showSignupForm();
        });
        closeLogin.addEventListener('click', closeLoginModal);
        document.getElementById('showSignup').addEventListener('click', showSignupForm);
        document.getElementById('showLogin').addEventListener('click', showLoginForm);

        loginModal.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                closeLoginModal();
            }
        });

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const savedUser = JSON.parse(localStorage.getItem(savedUserKey) || 'null');
            const isValidLogin = savedUser
                && loginName.value.trim() === savedUser.name
                && loginPassword.value === savedUser.password;

            loginError.textContent = isValidLogin ? '' : 'Error: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
            loginSuccess.textContent = isValidLogin ? 'เข้าสู่ระบบสำเร็จ' : '';
            if (isValidLogin) {
                showDashboard(savedUser.name);
            }
        });

        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!signupForm.checkValidity()) {
                signupError.textContent = 'Error: กรุณากรอกข้อมูลให้ครบถ้วน';
                return;
            }

            const user = {
                name: signupName.value.trim(),
                email: signupEmail.value.trim(),
                password: signupPassword.value
            };
            localStorage.setItem(savedUserKey, JSON.stringify(user));
            signupError.textContent = '';
            signupSuccess.textContent = 'บันทึกข้อมูลแล้ว สามารถเข้าสู่ระบบครั้งหน้าได้เลย';
        });

        const hotelCatalog = [
            ['Chiang Mai Mountain Lodge', 'chiang mai thailand', 'เชียงใหม่', '2200', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=85', 'ห้องวิวภูเขา · คาเฟ่ · Wi-Fi ฟรี'],
            ['Bangkok City Hotel', 'bangkok thailand', 'กรุงเทพฯ', '1800', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85', 'ใกล้รถไฟฟ้า · ฟิตเนส · ห้องประชุม'],
            ['Pattaya Sea View', 'pattaya thailand', 'พัทยา', '2100', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85', 'วิวทะเล · สระว่ายน้ำ · ห้องอาหาร'],
            ['Hua Hin Garden Resort', 'hua hin thailand', 'หัวหิน', '2400', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85', 'สวนส่วนตัว · สระว่ายน้ำ · อาหารเช้า'],
            ['Kanchanaburi River Retreat', 'kanchanaburi thailand', 'กาญจนบุรี', '1700', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=85', 'ริมน้ำ · กิจกรรมธรรมชาติ · ที่จอดรถ'],
            ['Khao Yai Green Escape', 'khao yai thailand', 'เขาใหญ่', '2600', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85', 'วิวธรรมชาติ · จักรยาน · คาเฟ่'],
            ['Koh Chang Island Villa', 'koh chang thailand', 'เกาะช้าง', '2800', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85', 'ติดชายหาด · เรือคายัค · สปา'],
            ['Phuket Old Town Stay', 'phuket thailand', 'ภูเก็ต', '2300', 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=85', 'ใกล้เมืองเก่า · สระว่ายน้ำ · รถรับส่ง'],
            ['Nakhon Ratchasima Grand', 'nakhon ratchasima thailand', 'นครราชสีมา', '1500', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85', 'ห้องครอบครัว · อาหารเช้า · Wi-Fi ฟรี']
        ];

        const hotelGrid = document.querySelector('.hotel-grid');
        hotelCatalog.forEach(([name, destination, location, price, image, amenities]) => {
            hotelGrid.insertAdjacentHTML('beforeend', `
                <article class="hotel-card" data-destination="${destination}" data-price="${price}" data-capacity="2" data-image="${image}" data-amenities="${amenities}">
                    <div class="hotel-image"><img src="${image}" alt="ภายในและบรรยากาศของ ${name}" loading="lazy"></div>
                    <div class="hotel-info"><h3>${name}</h3><div class="location">📍 ${location}, Thailand</div><div class="hotel-bottom"><div class="rating">★ 4.6</div><div class="price">฿${Number(price).toLocaleString('th-TH')}<small>/night</small></div></div><br><button class="btn btn-secondary details-button" type="button">View Details</button></div>
                </article>`);
        });

        const destinationInput = document.getElementById('destinationInput');
        const checkInInput = document.getElementById('checkInInput');
        const checkOutInput = document.getElementById('checkOutInput');
        const guestInput = document.getElementById('guestInput');
        const searchButton = document.getElementById('searchButton');
        const searchResult = document.getElementById('searchResult');
        const hotelCards = Array.from(document.querySelectorAll('.hotel-card'));

        function updateVisibleCardPrices() {
            const guestCount = Number(guestInput.value.match(/\d+/)[0]);

            hotelCards.forEach((card) => {
                const basePrice = Number(card.dataset.price);
                const includedGuests = Number(card.dataset.capacity);
                const extraGuests = Math.max(0, guestCount - includedGuests);
                const totalPrice = basePrice + (Math.round(basePrice * 0.2) * extraGuests);
                card.querySelector('.price').firstChild.textContent = `฿${totalPrice.toLocaleString('th-TH')}`;
            });
        }

        searchButton.addEventListener('click', () => {
            const destination = destinationInput.value.trim().toLowerCase();
            const checkIn = checkInInput.value;
            const checkOut = checkOutInput.value;

            searchResult.className = 'search-result';
            if (checkIn && checkOut && checkOut <= checkIn) {
                searchResult.classList.add('error-message');
                searchResult.textContent = 'Error: Check-out ต้องอยู่หลังวัน Check-in';
                return;
            }

            const matchingCards = hotelCards.filter((card) => {
                const hotelDestination = card.dataset.destination;
                return !destination || hotelDestination.includes(destination);
            });

            hotelCards.forEach((card) => {
                card.style.display = matchingCards.includes(card) ? '' : 'none';
            });
            updateVisibleCardPrices();

            if (matchingCards.length === 0) {
                searchResult.classList.add('error-message');
                searchResult.textContent = 'ไม่พบโรงแรมในสถานที่นี้ ลองค้นหาชื่อจังหวัด เช่น Bangkok, Chiang Mai, Phuket หรือ Krabi';
                return;
            }

            const resultText = matchingCards.length === 1 ? '1 hotel found' : `${matchingCards.length} hotels found`;
            searchResult.textContent = `${resultText} พร้อมราคา / night`;
            document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
        });

        guestInput.addEventListener('change', updateVisibleCardPrices);

        logoutButton.addEventListener('click', showHotelPage);
        headerLogoutButton.addEventListener('click', showHotelPage);
        headerUserName.addEventListener('click', () => {
            const savedUser = JSON.parse(localStorage.getItem(savedUserKey) || 'null');
            if (savedUser && localStorage.getItem(loggedInKey) === 'true') {
                showDashboard(savedUser.name);
            }
        });
            headerBookingsButton.addEventListener('click', () => {
                const savedUser = JSON.parse(localStorage.getItem(savedUserKey) || 'null');
                if (savedUser && localStorage.getItem(loggedInKey) === 'true') {
                    showDashboard(savedUser.name);
                    renderDashboardPage(1);
                    document.getElementById('bookingQueue').scrollIntoView({ behavior: 'smooth' });
                }
            });

        const detailsModal = document.getElementById('detailsModal');
        const closeDetails = document.getElementById('closeDetails');
        const detailsGuests = document.getElementById('detailsGuests');
        const detailsTitle = document.getElementById('detailsTitle');
        const detailsImage = document.getElementById('detailsImage');
        const detailsLocation = document.getElementById('detailsLocation');
        const detailsCapacity = document.getElementById('detailsCapacity');
        const detailsAmenities = document.getElementById('detailsAmenities');
        const detailsTotalPrice = document.getElementById('detailsTotalPrice');
        const detailsPriceNote = document.getElementById('detailsPriceNote');
        const bookDetailsButton = document.getElementById('bookDetailsButton');
        const detailsButtons = document.querySelectorAll('.details-button');
        let selectedHotel = null;

        function renderBookingQueue() {
            const bookingQueue = document.getElementById('bookingQueue');
            if (!bookingQueue) {
                return;
            }

            const bookings = JSON.parse(localStorage.getItem(getBookingsKey()) || '[]');
            const totalNights = bookings.reduce((total, booking) => total + (booking.nights || 1), 0);
            const totalSpend = bookings.reduce((total, booking) => total + Number(booking.price.replace(/[^\d]/g, '')), 0);
            const upcomingBooking = bookings[0];
            document.getElementById('upcomingTripsCount').textContent = bookings.length;
            document.getElementById('totalNightsCount').textContent = totalNights;
            document.getElementById('savedDealsCount').textContent = '0';
            document.getElementById('totalSpendAmount').textContent = `฿${totalSpend.toLocaleString('th-TH')}`;
            document.getElementById('upcomingBookingName').textContent = upcomingBooking ? upcomingBooking.hotel : 'ยังไม่มีรายการจอง';
            document.getElementById('upcomingBookingInfo').textContent = upcomingBooking
                ? `${upcomingBooking.location} · ${upcomingBooking.checkIn || 'ไม่ระบุวัน'} - ${upcomingBooking.checkOut || 'ไม่ระบุวัน'}`
                : 'เลือกโรงแรมเพื่อเพิ่มรายการจอง';
            document.getElementById('upcomingBookingPrice').textContent = upcomingBooking ? upcomingBooking.price : '-';
            document.getElementById('upcomingBookingGuests').textContent = upcomingBooking
                ? `${upcomingBooking.guests} guests · ${upcomingBooking.nights || 1} night${(upcomingBooking.nights || 1) > 1 ? 's' : ''}`
                : '-';
            document.getElementById('cancelBookingButton').disabled = !upcomingBooking;
            bookingQueue.innerHTML = bookings.length
                ? bookings.map((booking, index) => `<div class="queue-item"><div><strong>${booking.hotel}</strong><small>${booking.location} · ${booking.guests} guests · ${booking.price} / night</small></div><button class="btn btn-danger queue-cancel" data-booking-index="${index}" type="button">Cancel</button></div>`).join('')
                : '<p>ยังไม่มีรายการจอง เลือกโรงแรมเพื่อเพิ่มคิวจอง</p>';
        }

        function updateDetailsPrice() {
            if (!selectedHotel) {
                return;
            }

            const guestCount = Number(detailsGuests.value);
            const basePrice = Number(selectedHotel.dataset.price);
            const includedGuests = Number(selectedHotel.dataset.capacity);
            const extraGuests = Math.max(0, guestCount - includedGuests);
            const extraPrice = Math.round(basePrice * 0.2) * extraGuests;
            const totalPrice = basePrice + extraPrice;

            detailsTotalPrice.textContent = `฿${totalPrice.toLocaleString('th-TH')}`;
            detailsPriceNote.textContent = extraGuests
                ? `รวม ${includedGuests} คนแรกแล้ว เพิ่ม ฿${Math.round(basePrice * 0.2).toLocaleString('th-TH')} ต่อคนที่เพิ่ม`
                : `ราคานี้รวมผู้เข้าพัก ${includedGuests} คน / คืน`;
        }

        detailsButtons.forEach((button) => {
            button.addEventListener('click', () => {
                selectedHotel = button.closest('.hotel-card');
                detailsTitle.textContent = selectedHotel.querySelector('h3').textContent;
                detailsImage.src = selectedHotel.dataset.image;
                detailsImage.alt = `รายละเอียดภายใน ${detailsTitle.textContent}`;
                detailsLocation.textContent = selectedHotel.querySelector('.location').textContent.trim();
                detailsCapacity.textContent = `รองรับ ${selectedHotel.dataset.capacity} คน ในราคาพื้นฐาน ฿${Number(selectedHotel.dataset.price).toLocaleString('th-TH')} / คืน`;
                detailsAmenities.textContent = `สิ่งอำนวยความสะดวก: ${selectedHotel.dataset.amenities}`;
                detailsGuests.value = guestInput.value.startsWith('5') ? '5' : guestInput.value.match(/\d+/)[0];
                updateDetailsPrice();
                bookDetailsButton.textContent = 'จองที่พักนี้';
                bookDetailsButton.classList.add('btn-primary');
                bookDetailsButton.classList.remove('btn-disabled');
                bookDetailsButton.disabled = false;
                detailsModal.classList.add('is-open');
                detailsGuests.focus();
            });
        });

        detailsGuests.addEventListener('change', updateDetailsPrice);
        closeDetails.addEventListener('click', () => detailsModal.classList.remove('is-open'));
        detailsModal.addEventListener('click', (event) => {
            if (event.target === detailsModal) {
                detailsModal.classList.remove('is-open');
            }
        });

        renderBookingQueue();

        document.getElementById('bookNowButton').addEventListener('click', () => {
            document.querySelector('.hero-card').scrollIntoView({ behavior: 'smooth' });
            destinationInput.focus();
        });

        document.getElementById('heroDetailsButton').addEventListener('click', () => {
            document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('viewAllButton').addEventListener('click', () => {
            destinationInput.value = '';
            hotelCards.forEach((card) => card.style.display = '');
            searchResult.className = 'search-result';
            searchResult.textContent = 'แสดงโรงแรมทั้งหมดแล้ว';
        });

        document.getElementById('exploreDealsButton').addEventListener('click', () => {
            document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
            searchResult.textContent = 'เลือกโรงแรมที่สนใจเพื่อดูดีลและราคา';
        });

        document.getElementById('bookDetailsButton').addEventListener('click', (event) => {
            const startDate = checkInInput.value ? new Date(checkInInput.value) : null;
            const endDate = checkOutInput.value ? new Date(checkOutInput.value) : null;
            const nights = startDate && endDate ? Math.max(1, Math.ceil((endDate - startDate) / 86400000)) : 1;
            const bookings = JSON.parse(localStorage.getItem(getBookingsKey()) || '[]');
            bookings.push({
                hotel: selectedHotel.querySelector('h3').textContent,
                location: selectedHotel.querySelector('.location').textContent.trim(),
                guests: Number(detailsGuests.value),
                price: detailsTotalPrice.textContent,
                checkIn: checkInInput.value,
                checkOut: checkOutInput.value,
                nights
            });
            localStorage.setItem(getBookingsKey(), JSON.stringify(bookings));
            renderBookingQueue();
            event.currentTarget.textContent = 'เพิ่มเข้ารายการแล้ว';
            event.currentTarget.classList.remove('btn-primary');
            event.currentTarget.classList.add('btn-disabled');
            event.currentTarget.disabled = true;
        });

        document.getElementById('newBookingButton').addEventListener('click', showHotelCatalog);
        document.getElementById('viewAllBookingsButton').addEventListener('click', () => renderDashboardPage(2));
        document.getElementById('cancelBookingButton').addEventListener('click', (event) => {
            const bookings = JSON.parse(localStorage.getItem(getBookingsKey()) || '[]');
            bookings.shift();
            localStorage.setItem(getBookingsKey(), JSON.stringify(bookings));
            renderBookingQueue();
        });

        function cancelQueuedBooking(event) {
            const cancelButton = event.target.closest('.queue-cancel');
            if (!cancelButton) {
                return;
            }

            const bookings = JSON.parse(localStorage.getItem(getBookingsKey()) || '[]');
            bookings.splice(Number(cancelButton.dataset.bookingIndex), 1);
            localStorage.setItem(getBookingsKey(), JSON.stringify(bookings));
            renderBookingQueue();
        }

        document.querySelectorAll('.dashboard-tab').forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.dashboard-tab').forEach((tab) => tab.classList.remove('is-active'));
                button.classList.add('is-active');
                renderDashboardPage(button.dataset.view === 'bookings' ? 2 : 1);
            });
        });

        document.querySelectorAll('.period-tab').forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.period-tab').forEach((tab) => {
                    tab.classList.remove('is-active', 'btn-primary');
                    tab.classList.add('btn-outline');
                });
                button.classList.add('is-active', 'btn-primary');
                button.classList.remove('btn-outline');
            });
        });

        const dashboardContent = document.getElementById('dashboardContent');
        const initialDashboardContent = dashboardContent.innerHTML;
        const pageButtons = document.querySelectorAll('.page-button');
        let currentDashboardPage = 1;
        dashboardContent.addEventListener('click', cancelQueuedBooking);

        function bindDashboardPageOneActions() {
            const viewAllBookingsButton = document.getElementById('viewAllBookingsButton');
            const cancelBookingButton = document.getElementById('cancelBookingButton');
            if (viewAllBookingsButton) {
                viewAllBookingsButton.addEventListener('click', () => renderDashboardPage(2));
            }
            if (cancelBookingButton) {
                cancelBookingButton.addEventListener('click', (event) => {
                    event.currentTarget.textContent = 'Cancelled';
                    event.currentTarget.disabled = true;
                    event.currentTarget.classList.remove('btn-danger');
                    event.currentTarget.classList.add('btn-disabled');
                });
            }
        }

        function renderDashboardPage(pageNumber) {
            currentDashboardPage = Math.max(1, Math.min(3, pageNumber));
            if (currentDashboardPage === 1) {
                dashboardContent.innerHTML = initialDashboardContent;
                bindDashboardPageOneActions();
                renderBookingQueue();
            } else if (currentDashboardPage === 2) {
                const bookings = JSON.parse(localStorage.getItem(getBookingsKey()) || '[]');
                const bookingMarkup = bookings.length
                    ? bookings.map((booking) => `<div class="booking-row"><div><strong>${booking.hotel}</strong><p>${booking.location} · ${booking.checkIn || 'ไม่ระบุวัน'} - ${booking.checkOut || 'ไม่ระบุวัน'}</p></div><div class="booking-price">${booking.price}</div></div>`).join('')
                    : '<p>ยังไม่มีรายการจองของคุณ</p>';
                dashboardContent.innerHTML = `
                    <article class="dashboard-card dashboard-card-wide">
                        <div class="dashboard-card-header"><div><h2>My Bookings</h2><p>ประวัติการจองทั้งหมดของคุณ</p></div><span>▣</span></div>
                        ${bookingMarkup}
                    </article>
                    <article class="dashboard-card"><h2>Booking Status</h2><div class="stat-number">${bookings.length}</div><p>รายการยืนยันแล้ว</p></article>`;
            } else {
                dashboardContent.innerHTML = `
                    <article class="dashboard-card dashboard-card-wide"><div class="dashboard-card-header"><div><h2>Account & Support</h2><p>ข้อมูลบัญชีและความช่วยเหลือ</p></div><span>?</span></div><div class="booking-row"><div><strong>Account email</strong><p>${JSON.parse(localStorage.getItem(savedUserKey) || '{}').email || 'ยังไม่ได้ระบุ'}</p></div><div class="booking-price">✓</div></div><div class="booking-row"><div><strong>Help Center</strong><p>ติดต่อทีมงาน DealRoom ได้ตลอดเวลา</p></div><div class="booking-price">→</div></div></article>
                    <article class="dashboard-card"><h2>Member Level</h2><div class="stat-number">Gold</div><p>สิทธิพิเศษสำหรับสมาชิก</p></article>`;
            }
            pageButtons.forEach((button) => {
                const page = Number(button.dataset.page);
                button.classList.toggle('btn-primary', page === currentDashboardPage && button.textContent.trim() === String(page));
                button.classList.toggle('btn-outline', !(page === currentDashboardPage && button.textContent.trim() === String(page)));
                if (button.getAttribute('aria-label') === 'Previous page') {
                    button.disabled = currentDashboardPage === 1;
                }
                if (button.getAttribute('aria-label') === 'Next page') {
                    button.disabled = currentDashboardPage === 3;
                }
            });
            dashboardPage.scrollIntoView({ behavior: 'smooth' });
        }

        pageButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const requestedPage = button.getAttribute('aria-label') === 'Previous page'
                    ? currentDashboardPage - 1
                    : button.getAttribute('aria-label') === 'Next page'
                        ? currentDashboardPage + 1
                        : Number(button.dataset.page);
                renderDashboardPage(requestedPage);
            });
        });

        document.querySelectorAll('.page-nav').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                if (link.dataset.page === 'hotels') {
                    showHotelCatalog();
                } else {
                    showContentPage(link.dataset.page);
                }
            });
        });

        contentPage.addEventListener('click', (event) => {
            const actionButton = event.target.closest('[data-content-action]');
            if (actionButton) {
                showContentPage(actionButton.dataset.contentAction);
                return;
            }

            if (event.target.closest('.content-page-card .btn')) {
                showContentPage('hotels');
            }
        });

        restoreLoggedInSession();
