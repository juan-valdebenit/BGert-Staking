import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMetaMask from "../wallet/hook";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";

function Header(props) {
  const { client } = props;
  const { isConnected } = useAccount();
  const { connect, disconnect, isActive, account, shouldDisable, walletModal, handleWalletModal } = useMetaMask();
  return (
    <nav className="navbar navbar-default navbar-trans navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand text-brand" to="/">
          <img src="images/logo.png" alt="" />
          <span></span>
        </Link>
        <div className="navbar-collapse collapse justify-content-left" id="navbarDefault">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" title="Stake">
                BSC Stake
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/briseStake" title="Stake">
                BRC Stake
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle down-arrow" href="/#" title="Industries" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Trade
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" title="Exchange" to="/Exchange">
                  Exchange
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" title="Supports" data-toggle="modal" data-target="#myModal-14">
                Support
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faq">
                FAQ
              </a>
            </li>

            <div className="modal" id="myModal-14">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Support</h4>
                    <button type="button" className="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="liquidity">
                      <h4>Visit www.bitgert.com for Live Chat Support.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div className="right-side">
          <ul>
            <li>
              {/* {isActive ? (
                <div className="btn">
                  <div className="icon">
                    <svg viewBox="0 0 24 24" color="primary" width="24px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM ACFFk">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="title">{account ? account.slice(0, 2).concat(`...${account.slice(-4)}`) : ""}</div>
                  <svg viewBox="0 0 24 24" color="text" width="24px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                    <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
                  </svg>

                  <div className="popover__content">
                    <div className="product-body" onClick={() => disconnect()}>
                      <button className="color">
                        <div
                          className="left"
                        >
                          Disconnect
                        </div>
                        <div className="right">
                          <svg viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" style={{ fill: "#6600ff" }}>
                            <path d="M16.3 8.09014C15.91 8.48014 15.91 9.10014 16.3 9.49014L18.2 11.3901H9C8.45 11.3901 8 11.8401 8 12.3901C8 12.9401 8.45 13.3901 9 13.3901H18.2L16.3 15.2901C15.91 15.6801 15.91 16.3001 16.3 16.6901C16.69 17.0801 17.31 17.0801 17.7 16.6901L21.29 13.1001C21.68 12.7101 21.68 12.0801 21.29 11.6901L17.7 8.09014C17.31 7.70014 16.69 7.70014 16.3 8.09014ZM4 19.3901H11C11.55 19.3901 12 19.8401 12 20.3901C12 20.9401 11.55 21.3901 11 21.3901H4C2.9 21.3901 2 20.4901 2 19.3901V5.39014C2 4.29014 2.9 3.39014 4 3.39014H11C11.55 3.39014 12 3.84014 12 4.39014C12 4.94014 11.55 5.39014 11 5.39014H4V19.3901Z"></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  className="sr-btn"
                  onClick={() => handleWalletModal(true)}
                >
                  Connect Wallet
                </a>
              )} */}
              <Web3Button />
            </li>
            <div
              className={`modal ${walletModal ? "show" : ""}`}
              id="walletConnectModal"
              style={{
                display: `${walletModal ? "block" : "none"}`,
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Connect Wallet</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={() => handleWalletModal(false)}>
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="btn-connect" onClick={() => connect("metaMask")}>
                      <h1 className="connect">Metamask</h1>
                      <img src="images/meta.png" />
                    </div>
                    <div className="btn-connect" onClick={() => connect("walletConnect")}>
                      <h1 className="connect">Connect Wallet</h1>
                      <img src="images/wallet-connect.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <li><button onClick={() => props.disconnect()}>Disconnect</button></li>
						<li><button onClick={() => props.transaction()}>transaction</button></li> */}

            {/* <div className="modal" id="myModal">
							<div className="modal-dialog">
								<div className="modal-content">

									<div className="modal-header">
										<h4 className="modal-title">Connect Wallet</h4>
										<button type="button" className="close" data-dismiss="modal">&times;</button>
									</div>

									<div className="modal-body">
										<div className="grd">
											<div className="img">
												<a href="">
													<svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM la-Dshj">
														<path opacity="0.9" d="M19.9959 4.8377L20.7771 3.82105C20.5523 3.64825 20.2766 3.55457 19.9931 3.55457C19.7095 3.55457 19.4339 3.64825 19.209 3.82105L19.9959 4.8377ZM33.425 8.7837H34.7059C34.7081 8.61378 34.6767 8.44509 34.6134 8.28737C34.5502 8.12965 34.4563 7.98603 34.3372 7.8648C34.2181 7.74358 34.0762 7.64714 33.9196 7.58107C33.763 7.515 33.5949 7.4806 33.425 7.47985V8.7837ZM19.9959 36.2161L19.2837 37.2845C19.4936 37.425 19.7405 37.5 19.9931 37.5C20.2457 37.5 20.4925 37.425 20.7024 37.2845L19.9959 36.2161ZM6.57841 8.7837V7.49709C6.40847 7.49783 6.24036 7.53223 6.0838 7.5983C5.92723 7.66437 5.7853 7.76081 5.66621 7.88204C5.54712 8.00326 5.45322 8.14688 5.38995 8.3046C5.32667 8.46232 5.29526 8.63101 5.29754 8.80093L6.57841 8.7837ZM19.2148 5.84861C25.0275 10.3518 31.6846 10.0646 33.4307 10.0646V7.49709C31.6214 7.49709 25.8259 7.72684 20.7943 3.82105L19.2148 5.84861ZM32.1499 8.76073C32.0522 14.7113 31.7995 18.91 31.317 22.0174C30.8345 25.1248 30.1682 26.9399 29.2894 28.238C28.4106 29.5361 27.2848 30.3804 25.6364 31.3626C23.9879 32.3448 21.8799 33.4361 19.2837 35.1535L20.7312 37.2845C23.1895 35.6475 25.2343 34.6021 26.9747 33.5625C28.7284 32.6075 30.2502 31.2779 31.4319 29.6682C32.5806 27.9451 33.3675 25.6475 33.873 22.408C34.3785 19.1685 34.6369 14.809 34.7346 8.80093L32.1499 8.76073ZM20.7312 35.1535C18.1522 33.4304 16.05 32.362 14.413 31.3684C12.776 30.3747 11.6502 29.582 10.7656 28.238C9.8811 26.8939 9.16312 25.1076 8.66915 22.0174C8.17519 18.9273 7.95692 14.7113 7.85928 8.76073L5.29754 8.80093C5.39518 14.809 5.6594 19.18 6.15911 22.408C6.65882 25.636 7.42275 27.9336 8.59448 29.6682C9.77051 31.2788 11.2888 32.6088 13.0402 33.5625C14.7633 34.6021 16.8254 35.6475 19.2837 37.2845L20.7312 35.1535ZM6.57841 10.0646C8.30155 10.0646 14.9644 10.3518 20.7771 5.84861L19.209 3.82105C14.166 7.72684 8.37048 7.49709 6.57266 7.49709L6.57841 10.0646Z" fill="#3688EB"></path>
													</svg>
													<div className="img-title"> Trust Wallet </div>
												</a>
											</div>
											<div className="img">
												<a href="">
													<svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM la-Dshj">
														<path d="M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z" fill="#E17726"></path>
														<path d="M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z" fill="#E27625"></path>
														<path d="M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z" fill="#E27625"></path>
														<path d="M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z" fill="#E27625"></path>
														<path d="M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z" fill="#E27625"></path>
														<path d="M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z" fill="#E27625"></path>
														<path d="M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z" fill="#E27625"></path>
														<path d="M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z" fill="#E27625"></path>
														<path d="M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z" fill="#D5BFB2"></path>
														<path d="M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z" fill="#D5BFB2"></path>
														<path d="M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z" fill="#233447"></path>
														<path d="M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z" fill="#233447"></path>
														<path d="M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z" fill="#CC6228"></path>
														<path d="M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z" fill="#CC6228"></path>
														<path d="M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z" fill="#CC6228"></path>
														<path d="M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z" fill="#CC6228"></path>
														<path d="M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z" fill="#E27525"></path>
														<path d="M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z" fill="#E27525"></path>
														<path d="M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z" fill="#E27525"></path>
														<path d="M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z" fill="#E27525"></path>
														<path d="M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z" fill="#F5841F"></path>
														<path d="M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z" fill="#F5841F"></path>
														<path d="M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z" fill="#C0AC9D"></path>
														<path d="M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z" fill="#161616"></path>
														<path d="M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z" fill="#763E1A"></path>
														<path d="M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z" fill="#763E1A"></path>
														<path d="M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z" fill="#F5841F"></path>
														<path d="M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z" fill="#F5841F"></path>
														<path d="M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z" fill="#F5841F"></path>
													</svg>
													<div className="img-title"> Metamask </div>
												</a>
											</div>
											<div className="img">
												<a href="">
													<svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM la-Dshj">
														<path d="M8.68096 12.4756C14.9323 6.39698 25.0677 6.39698 31.3191 12.4756L32.0714 13.2071C32.384 13.511 32.384 14.0038 32.0714 14.3077L29.4978 16.8103C29.3415 16.9622 29.0881 16.9622 28.9318 16.8103L27.8965 15.8036C23.5354 11.563 16.4647 11.563 12.1036 15.8036L10.9948 16.8817C10.8385 17.0336 10.5851 17.0336 10.4288 16.8817L7.85517 14.3791C7.54261 14.0752 7.54261 13.5824 7.85517 13.2785L8.68096 12.4756ZM36.6417 17.6511L38.9322 19.8783C39.2448 20.1823 39.2448 20.675 38.9322 20.979L28.6039 31.022C28.2913 31.3259 27.7846 31.3259 27.472 31.022C27.472 31.022 27.472 31.022 27.472 31.022L20.1416 23.8942C20.0634 23.8182 19.9367 23.8182 19.8586 23.8942C19.8586 23.8942 19.8586 23.8942 19.8586 23.8942L12.5283 31.022C12.2157 31.3259 11.709 31.3259 11.3964 31.022C11.3964 31.022 11.3964 31.022 11.3964 31.022L1.06775 20.9788C0.755186 20.6749 0.755186 20.1821 1.06775 19.8782L3.35833 17.6509C3.6709 17.347 4.17767 17.347 4.49024 17.6509L11.8208 24.7789C11.8989 24.8549 12.0256 24.8549 12.1038 24.7789C12.1038 24.7789 12.1038 24.7789 12.1038 24.7789L19.4339 17.6509C19.7465 17.347 20.2533 17.347 20.5658 17.6509C20.5658 17.6509 20.5658 17.6509 20.5658 17.6509L27.8964 24.7789C27.9745 24.8549 28.1012 24.8549 28.1794 24.7789L35.5098 17.6511C35.8223 17.3471 36.3291 17.3471 36.6417 17.6511Z" fill="#3389FB"></path>
													</svg>
													<div className="img-title"> WalletConnect </div>
												</a>
											</div>
											<div className="img">
												<a href="">
													<svg viewBox="0 0 24 24" width="40px" color="textSubtle" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM hA-DcEf">
														<path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
													</svg>
													<div className="img-title"> More </div>
												</a>
											</div>
										</div>
									</div>

									<div className="modal-footer">
										<p>Haven’t got a crypto wallet yet?</p>
										<button type="button" className="btn btn-danger" data-dismiss="modal">Learn How to Connect</button>
									</div>
								</div>
							</div>
						</div> */}
          </ul>
        </div>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarDefault"
          aria-controls="navbarDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span></span> <span></span> <span></span>{" "}
        </button>
      </div>
    </nav>
  );
}

export default Header;
