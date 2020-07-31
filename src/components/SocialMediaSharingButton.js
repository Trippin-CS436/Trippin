import React, { Component } from 'react';
import { EmailShareButton, FacebookShareButton,EmailIcon, FacebookIcon} from "react-share";

const title = "My Itinerary";

const shareUrl = 'http://github.com';

const mapContainerStyle = {
  height: '400px',
  width: '600px',
  display: 'inline-block',
};


export default class SocialMediaSharingButton extends Component {
    render() {
        return (
            <div>
                 <EmailShareButton
                            url={shareUrl}
                            subject={title}
                            body="body"
                        >
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}

                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
            </div>
        )
    }
}
