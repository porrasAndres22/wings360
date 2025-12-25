import { useChangeOption } from '@/store'
import ListSchema from './Dashboard/ListSchema';
import ReferInfo from './Dashboard/ReferInfo';
import CreateSchema from './Dashboard/CreateSchema';
import HeaderOptions from './Dashboard/HeaderOptions';
import ListConnection from './Dashboard/ListConnection';
import ListUsers from './Dashboard/ListUsers';
import Options from './Dashboard/Options';
import { useEffect } from 'react';


export default ({ user }: { user: any }) => {

    const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();


    useEffect(() => {
        handler(location.hash)
        window.onhashchange = () => {
            handler(location.hash)
        }
    }, [data]);


    return (
        <div className="max-w-800px mx-auto px-4 lg:px-6 overflow-hidden">
            {data == "" ?
                <>
                    <HeaderOptions user={user}></HeaderOptions>
                    <ReferInfo></ReferInfo>
                </>
                : data == "#7cc7714c6789e85385afa3773e584a38a4b6ce77" ?
                    <>
                        <HeaderOptions user={user}></HeaderOptions>
                        <ListSchema></ListSchema>
                    </>

                    : data == "#b6aa6ab9f34e8f9cfbd19358d156cd4884f07a75" ?
                        <>
                            <HeaderOptions user={user}></HeaderOptions>
                            <ListUsers></ListUsers>
                        </>
                        : data == "#e4af5e2fef8ecc5e62164f586c33cda921f7eb28" ?
                            <>
                                <HeaderOptions user={user}></HeaderOptions>
                                <ListConnection></ListConnection>
                            </>
                            : data == "#2e73936b82174696f261a4bbb4ee8be5f1b41672" ?
                                <>
                                    <Options></Options>
                                </>
                                : <></>

            }
        </div>
    );
}