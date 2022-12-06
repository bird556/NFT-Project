import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LineLoader from '../LineLoader';
import { motion } from 'framer-motion';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../../firebase.config';
import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [ownerImageUrls, setOwnerImageUrls] = useState([]);
  const [nftData, setNftData] = useState({
    chain: 'Ethereum',
    contract_address: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
    imgs: {},
    nftName: '',
    price: 0,
    website: 'https://opensea.io/',
  });

  const { userImage } = userInfo;
  const { nftName, price, website, imgs, owner, ownerPhotoURL } = nftData;

  const auth = getAuth();
  const navigate = useNavigate();

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(`User Auth`, user);
          const fetchUsers = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            setUserInfo({
              ...docSnap.data(),
            });
            setNftData({
              ...nftData,
              ownerPhotoURL: docSnap.data().userImage[0],
            });
            setOwnerImageUrls([docSnap.data().userImage[0]]);
          };
          fetchUsers();
          setNftData({
            ...nftData,
            userRef: user.uid,
            owner: user.displayName,
          });
        } else {
          navigate('/login');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    return <LineLoader />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                // console.log('Upload is paused');
                break;
              case 'running':
                // console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const img = await Promise.all(
      [...imgs].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error('NFT Image failed to upload');
    });
    // const ownerImageUrls = [];

    // if (!userImage) {
    //   await Promise.all(
    //     [...ownerPhotoURL].map((image) => storeImage(image))
    //   ).catch(() => {
    //     setLoading(false);
    //     toast.error('Profile Image failed to upload');
    //   });
    // } else {
    //   // ownerImageUrls.push(userImage[0]);
    //   // ownerImageUrls.push(userImage[0]);
    //   setOwnerImageUrls(userImage[0]);
    // }

    // const imgUrls = async () => {
    //   let ownerImageUrls = await Promise.all(
    //     [...ownerPhotoURL].map((image) => storeImage(image))
    //   ).catch(() => {
    //     setLoading(false);
    //     toast.error('NFT Image failed to upload');
    //   });
    //   return ownerImageUrls;
    // };

    // let ownerImageUrls = await Promise.all(
    //   [...ownerPhotoURL].map((image) => storeImage(image))
    // ).catch(() => {
    //   setLoading(false);
    //   toast.error('Profile Image failed to upload');
    // });

    let ownerImageUrls = !userImage
      ? await Promise.all(
          [...ownerPhotoURL].map((image) => storeImage(image))
        ).catch(() => {
          setLoading(false);
          toast.error('Profile Image failed to upload');
        })
      : [userImage[0]];

    // if (userImage) {
    //   setOwnerImageUrls(userImage[0]);
    // }

    // if (!userImage) {
    //   imgUrls();
    // } else {
    //   setOwnerImageUrls(userImage[0]);
    // }

    const nftDataCopy = {
      ...nftData,
      img,
      owner: auth.currentUser.displayName,
      userRef: auth.currentUser.uid,
      // ownerImageUrls,
      ownerImageUrls,
      timestamp: serverTimestamp(),
      favorites: Math.floor(Math.random() * 1000) + 200,
      views: Math.floor(Math.random() * 100000) + 1500,
      tokenID: Math.floor(Math.random() * 1000) + 200,
    };

    delete nftDataCopy.imgs;
    delete nftDataCopy.ownerPhotoURL;
    // eslint-disable-next-line
    console.log(`Nft Data Copy`, nftDataCopy);

    const docRef = await addDoc(collection(db, 'nfts'), nftDataCopy);
    console.log(docRef);

    if (!userImage) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...userInfo,
        // userImage: ownerImageUrls,
        userImage: ownerImageUrls,
      });
    }

    setLoading(false);

    toast.success('NFT Uploaded');

    // navigate(`/nft/${docRef.id}`);
    navigate(`/`);
  };

  // on Change
  const onMutate = (e) => {
    e.preventDefault();
    // Files
    if (e.target.files) {
      setNftData((prevState) => ({
        ...prevState,
        imgs: e.target.files,
      }));
    }

    if (e.target.id === 'ownerPhotoURL' && !ownerPhotoURL) {
      setNftData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files,
      }));
    }

    if (!e.target.files) {
      setNftData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
    // Text/Numbers
  };

  return (
    <>
      <motion.div
        className="hero min-h-[90vh]"
        initial={{
          x: 1500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <div className="hero-content card shadow-2xl transition-all duration-1000">
          <div className="flex flex-col items-center bg-base-100 rounded-lg overflow-hidden">
            <form onSubmit={onSubmit}>
              <div className="text-center p-12">
                <label className="text-4xl font-bold">Upload NFT</label>
              </div>
              <div className="flex flex-col items-center gap-6 p-6">
                {/* NFT Name */}
                <div className="w-full flex flex-col gap-2">
                  <label className="self-start font-semibold">NFT Name</label>
                  <select
                    id="nftName"
                    className="select select-bordered w-full max-w-xs"
                    required
                    onChange={onMutate}
                    value={nftName}
                  >
                    <option disabled selected value="">
                      NFT Name
                    </option>
                    <option id="nftName" value={'Hape Beast'}>
                      Hape Beast
                    </option>
                    <option id="nftName" value={'Bored Ape Yacht Club'}>
                      Bored Ape Yacht Club
                    </option>
                    <option id="nftName" value={'Fluf'}>
                      Fluf
                    </option>
                  </select>
                </div>
                {/* Price */}
                <div className="w-full flex flex-col gap-2">
                  <label className="self-start font-semibold">Price</label>

                  <input
                    id="price"
                    value={price}
                    onChange={onMutate}
                    type="number"
                    placeholder="ETH"
                    className="input input-bordered w-full max-w-xs"
                    required
                    min={0}
                    max={1000}
                  />
                </div>
                {/* Website */}
                <div className="w-full flex flex-col gap-2">
                  <h1 className="self-start font-semibold">Website</h1>
                  <input
                    id="website"
                    type="text"
                    value={website}
                    onChange={onMutate}
                    placeholder="https://opensea.io/"
                    className="input input-bordered w-full max-w-xs"
                    maxLength={32}
                    minLength={8}
                    required
                  />
                </div>
                {/* Owner */}

                <div className="w-full flex flex-col gap-2">
                  <label className="self-start font-semibold">Owner</label>
                  <input
                    id="owner"
                    type="text"
                    // onChange={onMutate}
                    placeholder={owner}
                    value={owner}
                    className="input input-bordered w-full max-w-xs"
                    required
                  />
                </div>

                {/* Owner Photo UPLOAD */}
                {!userImage ? (
                  <div className="w-full flex flex-col gap-2">
                    <label className="self-start font-semibold">
                      Owner Image
                    </label>
                    <input
                      onChange={onMutate}
                      type="file"
                      id="ownerPhotoURL"
                      max="1"
                      accept=".jpg,.png,.jpeg"
                      className="file-input file-input-bordered w-full max-w-xs"
                      required
                    />
                  </div>
                ) : null}

                {/* NFT UPLOAD */}
                <div className="w-full flex flex-col gap-2">
                  <label className="self-start font-semibold">NFT Image</label>
                  <input
                    onChange={onMutate}
                    type="file"
                    id="imgs"
                    max="1"
                    accept=".jpg,.gif,.png,.jpeg"
                    className="file-input file-input-bordered w-full max-w-xs"
                    required
                  />
                </div>
              </div>
              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-primary w-full text-white"
              >
                Upload NFT
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default CreateListing;
