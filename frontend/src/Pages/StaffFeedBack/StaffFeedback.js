import {
    Container,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Switch,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '~/Pages/StaffFeedBack/StaffFeedback.module.scss';

import React, { useState, useEffect } from 'react';
import FeedbackAPI from '~/Api/FeedbackAPI';
import UserAPI from '~/Api/UserAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';

const cx = classNames.bind(styles);
function StaffFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [vinh, setVinh] = useState(true);
    const [sort, setSort] = useState({
        page: 1,
        limit: 12,
        rating: null,
        speciesId: null,
        date: null,
        username: null,
        status: null,
        sortRating: null,
        sortDate: null,
    });

    const changeStatus = async (id, index) => {
        const updatedFeedback = [...feedbackList];
        updatedFeedback[index].status = !updatedFeedback[index].status;
        const change = await FeedbackAPI.changeStatus(id);
        setFeedbackList(updatedFeedback);
        setVinh(true);
    };

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const feedbackList = await FeedbackAPI.getAllFeedbackSystem(sort);
                console.log(feedbackList);
                setFeedbackList(feedbackList.listResult);
            } catch (error) {
                console.log(error);
            }
        };
        if (vinh) {
            getFeedback();
            setVinh(false);
        }

        getFeedback();
    }, [vinh || sort]);

    useEffect(() => {
        const getUserbyId = async () => {
            const data = [];
            for (const item of feedbackList) {
                const feedback = { ...item };
                try {
                    feedback.userInfor = await UserAPI.getUserById(item.userId);
                    feedback.species = await ParrotSpeciesColorAPI.findOneSpeciesByColorId(item.colorId);
                    data.push(feedback);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };
        getUserbyId();
    }, [feedbackList]);

    useEffect(() => {
        console.log(combineData);
    }, [combineData]);

    useEffect(() => {
        console.log(feedbackList);
    }, [feedbackList]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        console.log(newSortValue);
    };

    useEffect(() => {
        console.log(sort);
    }, [sort]);

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Feedback</h1>
            </div>
            <div className={cx('sort-space')}>
                <select
                    name="status"
                    id="status"
                    onChange={(e) => setSort({ ...sort, rating: parseInt(e.target.value) })}
                >
                    <option value="" disabled selected>
                        Rating
                    </option>

                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, sortRating: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Rating
                    </option>
                    <option value="RDESC">Highest</option>
                    <option value="RASC">Lowest</option>
                </select>

                <select name="status" id="status" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>

                <input
                    type="number"
                    className={cx('sort-species-id')}
                    placeholder="Species Id..."
                    onChange={(e) => setSort({ ...sort, speciesId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="username..."
                    onChange={(e) => setSort({ ...sort, username: e.target.value })}
                />

                <input type="date" value={sort.date} onChange={(e) => setSort({ ...sort, date: e.target.value })} />

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Content</Th>
                            <Th>Species</Th>
                            <Th>Create At</Th>
                            <Th>Rating</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((feedback, index) => (
                                <Tr key={index}>
                                    <Td>{feedback.id}</Td>
                                    <Td>{feedback.userInfor.fullName}</Td>
                                    <Td className={cx('feedback-content')} maxWidth={100}>
                                        {feedback.content}
                                    </Td>
                                    <Td>{feedback.species.name}</Td>
                                    <Td>{formatDate(new Date(feedback.createdDate))}</Td>
                                    <Td>{feedback.rating}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={feedback.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(feedback.id, index)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default StaffFeedback;
