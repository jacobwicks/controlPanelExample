import React, { useContext, useEffect, useState } from 'react';
import { AlbumsContext } from '../../services/AlbumsContext';
import { loadAlbums, loadImageQueue } from '../../services/Api/';
import { Grid, Button, Segment, Header } from 'semantic-ui-react';
import Album from './components/Album';
import ImageReview from './components/ImageReview';
import { ImageReviewStatus, AlbumsActionTypes } from '../../types/types';
import AddOrCreateAlbumModal from './components/AddOrCreateAlbumModal';
import SideBar from './components/SideBar';

const NoAlbum = () => (
    <div>
        <Header as="h2">No Album Selected</Header>
        The bot can access albums that are hosted on{' '}
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.imgur.com"
        >
            Imgur
        </a>
        .
        <br />
        You need to add an Imgur API key to the bot for this feature to work.
        <br />
        You can use the API tab to add the Imgur API key. <br />
        You can add existing Imgur Albums that you own. <br />
        To add an existing Imgur Album you{' '}
        <a
            href="https://dev.to/codingcoach/get-your-album-id-in-imgur-b6c"
            target="_blank"
            rel="noopener noreferrer"
        >
            {' '}
            need the Album Hash, aka Id
        </a>{' '}
        <br />
        You can also create new Imgur Albums using the control panel.
    </div>
);

const Albums = () => {
    const { dispatch, album, fetching, imageQueue, review } = useContext(
        AlbumsContext
    );

    const toReview = imageQueue?.filter(
        (img) => img.status === ImageReviewStatus.pending
    ).length;

    const singular = toReview === 1;

    return (
        <div>
            <Segment>
                <Grid columns={2} divided>
                    <Grid.Column width={4}>
                        <Header
                            as="h2"
                            onClick={() =>
                                dispatch({
                                    type: AlbumsActionTypes.setAlbum,
                                    album: '',
                                })
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            Albums
                            <Button
                                disabled={fetching}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    loadAlbums(dispatch);
                                }}
                                floated="right"
                                icon="refresh"
                            />
                        </Header>
                        <div>
                            Add album {'   '}
                            <AddOrCreateAlbumModal />
                        </div>
                        <SideBar />
                    </Grid.Column>
                    <Grid.Column>
                        {album ? (
                            <Album album={album} key={album} />
                        ) : (
                            <NoAlbum />
                        )}
                    </Grid.Column>
                </Grid>
            </Segment>
            {imageQueue && (
                <Button
                    onClick={() =>
                        album
                            ? dispatch({
                                  type: AlbumsActionTypes.setAlbum,
                                  album: '',
                              })
                            : dispatch({
                                  type: AlbumsActionTypes.setReview,
                                  review: !review,
                              })
                    }
                >
                    There {singular ? 'is' : 'are'} {toReview ? toReview : 'no'}{' '}
                    image
                    {!singular && 's'} waiting for review
                </Button>
            )}
            {review && <ImageReview album={album} />}
        </div>
    );
};

export default Albums;
