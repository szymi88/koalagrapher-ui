import {useEffect, useState} from 'react';
import {fetchGallery} from "../api/gallery";

function useGallery(galleryId) {
    const [gallery, setGallery] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getGallery(galleryId).then((ret) => {
            setGallery(ret);
        }).catch(setError);
    }, [galleryId]);


    return [gallery, error];
}

export const getGallery = async (id) => {
    if (id === "123") {
        return getTestGallery();
    }
    return fetchGallery(id)
}


const testSections = [
    {
        "images": [
            "https://images.unsplash.com/photo-1729037049420-fd0ead54286a?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDl8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDF8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728209150875-538e6ffa0aae?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjV8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1726992117688-417e60c79294?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTl8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1729066390688-7aaeb3200146?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTh8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1711984441735-e92caf51b481?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDh8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728343070484-0874149980d9?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDB8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5Nnx8fGVufDB8fHx8fA%3D%3D",

        ],
        "name": "Section 1",
        "id": 0
    }, {
        "images": [
            "https://images.unsplash.com/photo-1728756195397-f0d898354dbc?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzZ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728662965625-6838648b8198?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzd8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728934189385-ac692470acf6?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzh8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1725983645484-7d0d5df1e127?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzl8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728986554951-801b2faf66c5?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDB8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1721332149112-c54e68990d99?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDF8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728931710024-c015ea8f4414?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDJ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728912846321-4dd243c14532?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDN8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1728643592445-012fc53c3ea2?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDR8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDJ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1700830960459-90d4dd355b7b?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDN8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1727967030998-d567b51aeac6?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDR8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDV8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728914298685-c1c9dc373069?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDZ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728588267038-9f36d7a74588?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1711984441735-e92caf51b481?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDh8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1729037049420-fd0ead54286a?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDl8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1729025069298-7797a089b813?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTB8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1719937050601-969f4f25d060?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTF8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1729006076706-888c334c11ed?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTJ8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1688045669522-b7c7603dbb70?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTN8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728621181152-e72685d7bdc1?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTR8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1729016258424-317d0f05aa28?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTV8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728580550896-1c246690583c?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTZ8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1729038869604-0f06939df97d?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTd8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1729066390688-7aaeb3200146?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTh8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1726992117688-417e60c79294?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTl8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1727258165928-89ceb4be49ca?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjB8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1721332150382-d4114ee27eff?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjF8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1728657016606-2079d76d3e97?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjJ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1727513029520-1eb6afa954d3?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjN8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1727840732819-bf9116432beb?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjR8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728209150875-538e6ffa0aae?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjV8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1729036341134-8f445db7c645?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjZ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728209120161-98ba323862ea?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjd8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728310341959-6451b2d37f28?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjh8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728509807162-8941c3b10fa4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjl8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1728669793639-cea768b6349a?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzB8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzF8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728547270732-544bc49f3922?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzJ8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728649054288-61f332ee389b?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzN8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1728785954407-03ded8e30ff3?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzR8fHxlbnwwfHx8fHw%3D",
            "https://plus.unsplash.com/premium_photo-1721950049140-07342cbc98db?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzV8fHxlbnwwfHx8fHw%3D",

        ],
        "name": "Section 2",
        "id": 1
    }]


function getTestGallery() {
    return {
        id: "123",
        title: "Test Gallery",
        sections: testSections.map(section => ({
            photos: section.images.map((image, index) => ({
                id: section.id + "_photo_" + index,
                key: section.id + "_photo_" + index,
                src: image,
                width: 3840,
                height: 4800
            })),
            id: section.id,
            name: section.name
        }))
    };
}


export default useGallery;