import React from 'react';
import { Img } from 'remotion';

// 1. Threads Logo (36px)
const ThreadsLogo = () => (
    <svg height="36px" viewBox="0 0 192 192" width="36px" xmlns="http://www.w3.org/2000/svg" style={{ color: '#f3f5f7' }}>
        <path fill="currentColor" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
    </svg>
);

// 2. SVG Heart (Like) - 34px
const HeartIcon = () => (
    <svg aria-label="Like" role="img" viewBox="-0.5 0 25 24" width="34px" height="34px" style={{ color: 'currentColor', display: 'block' }}>
        <path d="M16.5 2C14.8335 2 13.2217 2.70703 12 3.93652C10.7783 2.70704 9.1665 2 7.5 2C3.3785 2 0.5 5.08423 0.5 9.5C0.5 14.1284 4.84516 19.4619 11.311 22.7719C11.5267 22.8827 11.7633 22.9379 12 22.9379C12.2367 22.9379 12.4733 22.8827 12.689 22.7719C19.1548 19.4619 23.5 14.1284 23.5 9.5C23.5 5.08423 20.6217 2 16.5 2ZM12 20.8764C6.30767 17.8962 2.5 13.3467 2.5 9.5C2.5 6.15893 4.4625 4 7.5 4C9.5 4 11.25 5.75 12 7.5C12.75 5.75 14.5 4 16.5 4C19.5377 4 21.5 6.15893 21.5 9.5C21.5 13.3467 17.6923 17.8962 12 20.8764Z" fill="currentColor" />
    </svg>
);

// 3. SVG Reply - 34px
const ReplyIcon = () => (
    <svg aria-label="Reply" role="img" viewBox="0 0 24 24" width="34px" height="34px" style={{ color: 'currentColor', display: 'block' }}>
        <path clipRule="evenodd" fillRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.414 21 14.7492 20.6747 15.9373 20.0956C16.1277 20.0028 16.3428 19.9728 16.5514 20.0101L20.7565 20.7619L19.9927 16.5927C19.954 16.3815 19.9843 16.1633 20.0792 15.9707C20.6685 14.7742 21 13.4273 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92486 5.92488 1 12 1C18.0752 1 23 5.92488 23 12C23 13.6205 22.649 15.1615 22.018 16.549L22.9836 21.8198C23.0427 22.1423 22.94 22.4733 22.7086 22.7056C22.4773 22.938 22.1468 23.0421 21.824 22.9844L16.512 22.0348C15.1341 22.6553 13.6061 23 12 23C5.92488 23 1 18.0752 1 12Z" fill="currentColor" />
    </svg>
);

// 4. SVG Repost - 34px
const RepostIcon = () => (
    <svg aria-label="Repost" role="img" viewBox="0 0 24 24" width="34px" height="34px" style={{ color: 'currentColor', display: 'block' }}>
        <path d="M4.51617 6.9986C6.13179 4.58593 8.88099 2.99979 11.9995 2.99979C15.7267 2.99979 18.9259 5.26459 20.2927 8.49676C20.5079 9.00543 21.0946 9.24341 21.6033 9.0283C22.1119 8.81318 22.3499 8.22644 22.1348 7.71777C20.466 3.7716 16.5582 0.999786 11.9995 0.999786C8.27776 0.999786 4.9897 2.84823 2.99988 5.67416V2.9986C2.99988 2.44631 2.55216 1.9986 1.99988 1.9986C1.44759 1.9986 0.999878 2.44631 0.999878 2.9986V7.9986C0.999878 8.55088 1.44759 8.9986 1.99988 8.9986H6.99988C7.55216 8.9986 7.99988 8.55088 7.99988 7.9986C7.99988 7.44631 7.55216 6.9986 6.99988 6.9986H4.51617Z" fill="currentColor" />
        <path d="M2.39572 14.9713C2.90439 14.7562 3.49113 14.9942 3.70625 15.5029C5.07309 18.735 8.27228 20.9998 11.9995 20.9998C15.118 20.9998 17.8672 19.4137 19.4828 17.001H16.9991C16.4468 17.001 15.9991 16.5533 15.9991 16.001C15.9991 15.4487 16.4468 15.001 16.9991 15.001H21.9991C22.5514 15.001 22.9991 15.4487 22.9991 16.001V21.001C22.9991 21.5533 22.5514 22.001 21.9991 22.001C21.4468 22.001 20.9991 21.5533 20.9991 21.001V18.3255C19.0093 21.1514 15.7212 22.9998 11.9995 22.9998C7.44077 22.9998 3.53298 20.228 1.86419 16.2818C1.64908 15.7732 1.88705 15.1864 2.39572 14.9713Z" fill="currentColor" />
    </svg>
);

// 5. SVG Share - 34px
const ShareIcon = () => (
    <svg aria-label="Share" role="img" viewBox="0 0 24 24" width="34px" height="34px" style={{ color: 'currentColor', display: 'block' }}>
        <path clipRule="evenodd" fillRule="evenodd" d="M7.2474 1.49853C4.18324 -0.187039 0.600262 2.64309 1.53038 6.01431L3.18181 12L1.53038 17.9857C0.600277 21.3569 4.18324 24.1871 7.2474 22.5015L20.8245 15.0329C23.2153 13.7177 23.2153 10.2823 20.8244 8.96712L7.2474 1.49853ZM3.45835 5.48239C2.99873 3.81649 4.76927 2.41796 6.28345 3.25089L19.8605 10.7195C20.0016 10.7971 20.123 10.8923 20.2247 11H4.98064L3.45835 5.48239ZM4.98064 13L3.45835 18.5176C2.99873 20.1835 4.76927 21.5821 6.28345 20.7491L19.8605 13.2805C20.0016 13.2029 20.123 13.1078 20.2247 13H4.98064Z" fill="currentColor" />
    </svg>
);

export const ThreadsCard: React.FC<any> = ({
    handle = 'username',
    avatar,
    text = '',
    mediaUrl,
    timestamp = '17 giờ',
    likes = '0',
    replies = '0',
    reposts = '0'
}) => {
    return (
        <div style={{
            background: '#101010',
            border: '1px solid #282828',
            borderRadius: '24px',
            maxWidth: '880px',
            width: '92%',
            padding: '36px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.6)',
            color: '#f3f5f7',
            boxSizing: 'border-box'
        }}>
            {/* Header: Avatar, Username, Timestamp, Logo */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {avatar && (
                    <Img 
                        src={avatar} 
                        style={{ 
                            width: '68px', 
                            height: '68px', 
                            borderRadius: '50%', 
                            marginRight: '16px',
                            objectFit: 'cover' 
                        }} 
                    />
                )}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '700', fontSize: '28px', color: '#f3f5f7' }}>
                        {handle}
                    </span>
                    <span style={{ color: '#777777', fontSize: '24px', fontWeight: '400' }}>
                        · {timestamp}
                    </span>
                </div>
                <ThreadsLogo />
            </div>

            {/* Content Text */}
            <div style={{ 
                fontSize: '34px', 
                lineHeight: 1.42, 
                color: '#f3f5f7', 
                marginBottom: mediaUrl ? '22px' : '26px', 
                textAlign: 'left', 
                fontWeight: '400',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
            }}>
                {text}
            </div>

            {/* Media Image đính kèm */}
            {mediaUrl && (
                <div style={{ 
                    borderRadius: '18px', 
                    overflow: 'hidden', 
                    border: '1px solid #282828', 
                    marginBottom: '26px',
                    maxHeight: '620px'
                }}>
                    <Img 
                        src={mediaUrl} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                </div>
            )}

            {/* Action Icons Bar: Đồng bộ icon và chỉ số */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '36px', 
                color: '#9e9e9e', // Màu xám chuẩn Threads đồng bộ cho cả icon và số
                paddingTop: '6px'
            }}>
                {/* Like */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HeartIcon />
                    {likes !== '0' && (
                        <span style={{ 
                            fontSize: '26px', 
                            fontWeight: '600', 
                            color: '#9e9e9e',
                            lineHeight: 1 
                        }}>
                            {likes}
                        </span>
                    )}
                </div>

                {/* Reply */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ReplyIcon />
                    {replies !== '0' && (
                        <span style={{ 
                            fontSize: '26px', 
                            fontWeight: '600', 
                            color: '#9e9e9e',
                            lineHeight: 1 
                        }}>
                            {replies}
                        </span>
                    )}
                </div>

                {/* Repost */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RepostIcon />
                    {reposts !== '0' && (
                        <span style={{ 
                            fontSize: '26px', 
                            fontWeight: '600', 
                            color: '#9e9e9e',
                            lineHeight: 1 
                        }}>
                            {reposts}
                        </span>
                    )}
                </div>

                {/* Share */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ShareIcon />
                </div>
            </div>
        </div>
    );
};
