async function loadPublicationData() {
    try {
        const res = await fetch('../resources/publications.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        const pub_ul = document.getElementById('publications-list');
        
        pub_ul.innerHTML = '';

        // 3) Create and append LI for each publication
        data.forEach(pub => {
            const li = document.createElement('li');
            li.className = 'list-group-item pub-item';
            li.innerHTML = pub['citation'] + "<a href='" + pub['link'] +"' target='_blank'><span style='margin-left:5px;' class='badge rounded-pill text-bg-primary'>View</span></a>";
            pub_ul.appendChild(li);
        });
        
    } catch (e) {
        console.error(e);
    }
}
loadPublicationData();